import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'components/UI/image';
import { closeGrayIcon } from 'resources/images';
import styles from './styles.module.css';

const SearchInput = ({ selectedPlaces, setSelectedPlaces }) => {
  const [inputValue, setInputValue] = useState('');
  const [predictions, setPredictions] = useState([]);
  const autocompleteServiceRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const googleApiKey = 'AIzaSyC5OA1IJHkfwEB6pJx5U5OZTXgVioHoLMU';

  useEffect(() => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
      script.async = true;
      script.onload = () => {
        setTimeout(() => {
          if (
            window.google &&
            window.google.maps &&
            window.google.maps.places
          ) {
            autocompleteServiceRef.current =
              new window.google.maps.places.AutocompleteService();
            setScriptLoaded(true);
          } else {
            console.error('Google Maps API failed to load');
          }
        }, 1000);
      };
      script.onerror = () => console.error('Google Maps script failed to load');
      document.body.appendChild(script);
    } else {
      console.log('Google Maps script already loaded');
      autocompleteServiceRef.current =
        new window.google.maps.places.AutocompleteService();
      setScriptLoaded(true);
    }
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim().length > 0 && autocompleteServiceRef.current) {
      autocompleteServiceRef.current.getPlacePredictions(
        { input: value, types: ['geocode'] },
        (predictionsList, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictionsList
          ) {
            setPredictions(predictionsList);
          } else {
            console.warn('No predictions found or API error:', status);
            setPredictions([]);
          }
        }
      );
    } else {
      setPredictions([]);
    }
  };

  const handleSelectPlace = (place) => {
    if (
      selectedPlaces.some((selected) => selected.place_id === place.place_id)
    ) {
      return;
    }
    const selected = { place_id: place.place_id, title: place.description };
    setSelectedPlaces((prev) => [...prev, selected]);
    setInputValue('');
    setPredictions([]);
  };

  const handleDelete = (index) => {
    setSelectedPlaces((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.searchPlaces_mainContainer}>
      <p className={styles.searchPlaces_titleText}>Places</p>
      <div className={styles.searchPlaces_container}>
        {selectedPlaces.map((place, index) => (
          <div className={styles.searchPlaces_tagItem} key={place.place_id}>
            <label className={styles.searchPlaces_tagValue}>
              {place.title}
            </label>
            <Image
              image={closeGrayIcon}
              altText="closeGrayIcon"
              onClick={() => handleDelete(index)}
              className={styles.searchPlaces_closeGrayIcon}
            />
          </div>
        ))}
        <input
          type="text"
          placeholder="Add Place"
          className={styles.inputField}
          value={inputValue}
          onChange={handleInputChange}
          disabled={!scriptLoaded} // Disable input until script is loaded
        />
        {predictions.length > 0 && (
          <div className={styles.searchPlaces_suggestionsList}>
            {predictions.map((place) => (
              <p
                key={place.place_id}
                className={styles.searchPlaces_suggestionItem}
                onClick={() => handleSelectPlace(place)}
              >
                {place.description}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

SearchInput.propTypes = {
  selectedPlaces: PropTypes.array.isRequired,
  setSelectedPlaces: PropTypes.func.isRequired,
};

export default SearchInput;
