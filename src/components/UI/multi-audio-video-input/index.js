import React from 'react';
import { Image } from 'components/UI/image';
import { closeGrayIcon } from 'resources/images';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import classNames from 'classnames';

const MultiAudioVideoInput = (props) => {
  // PROPS
  const {
    label,
    values,
    setValues,
    placeholder,
    type,
    customMultiValueInput_subContainer,
    custom_inputField,
  } = props;

  // FUNCTION : To paste the value
  const handleAudioPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');

    // Split pasted data by newlines, commas, or spaces
    const newValues = pasteData.split(/[\n, ]+/).filter(Boolean);

    // TikTok Audio Link Validation
    const tikTokAudioRegex =
      /^https?:\/\/(www\.)?tiktok\.com\/music\/[\w-]+-\d+$/;

    // YouTube Video Link Validation
    const youTubeRegex =
      /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+$/;

    // SoundCloud Track Link Validation
    const soundCloudRegex =
      /^https?:\/\/(www\.)?soundcloud\.com\/[\w-]+\/[\w-]+$/;

    // Spotify MP3 Preview Link Validation
    const spotifyRegex =
      /^https?:\/\/p\.scdn\.co\/mp3-preview\/[\w]+(\?cid=[\w]+)?$/;

    // Instagram Reels Audio Link Validation
    const instagramAudioRegex =
      /^https?:\/\/(www\.)?instagram\.com\/reels\/audio\/\d+\/?$/;

    const audioRegex =
      /^(https?:\/\/)?(www\.)?(tiktok\.com\/music\/|tiktok\.com\/sound\/|youtube\.com\/watch\?v=|youtu\.be\/|soundcloud\.com\/|facebook\.com\/.*\/videos\/|instagram\.com\/reels\/|instagram\.com\/p\/|spotify\.com\/track\/|.*\.(mp3|wav|aac|flac|ogg|m4a))$/;

    // Filter only valid TikTok, YouTube, SoundCloud, Spotify, or Instagram links
    const validLinks = newValues.filter(
      (link) =>
        tikTokAudioRegex.test(link) ||
        youTubeRegex.test(link) ||
        soundCloudRegex.test(link) ||
        spotifyRegex.test(link) ||
        instagramAudioRegex.test(link) ||
        audioRegex.test(link)
    );

    if (validLinks.length === 0) {
      alert(
        'Please paste a valid TikTok, YouTube, SoundCloud, Spotify, or Instagram Reels Audio link.'
      );
      return;
    }

    setValues((prevValues) => {
      const uniqueLinks = [...new Set([...prevValues, ...validLinks])];
      return uniqueLinks;
    });
  };

  const handleVideoPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');

    const newValues = pasteData.split(/[\n, ]+/).filter(Boolean);

    const tikTokVideoRegex =
      /^https?:\/\/(www\.)?tiktok\.com\/(@[\w.-]+\/)?video\/\d+\/?$/;

    const validLinks = newValues.filter((link) => tikTokVideoRegex.test(link));

    if (validLinks.length === 0) {
      alert('Please paste a valid TikTok video link.');
      return;
    }

    setValues((prevValues) => {
      const uniqueLinks = [...new Set([...prevValues, ...validLinks])];
      return uniqueLinks;
    });
  };

  // FUNCTION: To delete value onclick the close icon
  const handleDelete = (index) => {
    const updatedValues = [...values];
    updatedValues.splice(index, 1);
    setValues(updatedValues);
  };

  // FUNCTION : To remove value while hit backspace
  const handleBackspace = (e) => {
    if (e.key === 'Backspace' && e.target.value === '' && values.length > 0) {
      setValues((prevValues) => prevValues.slice(0, -1));
    }
  };

  return (
    <div className={styles.multiValueInput_container}>
      <label className={styles.multiValueInput_label}>{label}</label>
      <div
        className={classNames(
          styles.multiValueInput_subContainer,
          customMultiValueInput_subContainer
        )}
      >
        <div className={styles.multiValueInput_tagWrapper}>
          {values.map((value, index) => (
            <div className={styles.multiValueInput_tagItem} key={index}>
              <label className={styles.multiValueInput_tagValue}>{value}</label>
              <Image
                image={closeGrayIcon}
                altText="closeGrayIcon"
                onClick={() => handleDelete(index)}
                customImageContainerStyle={styles.multiValueInput_closeGrayIcon}
                customImageStyle={styles.multiValueInput_closeGrayFit}
              />
            </div>
          ))}
          <input
            type="text"
            placeholder={placeholder}
            className={classNames(styles.inputField, custom_inputField)}
            onPaste={type === 'audio' ? handleAudioPaste : handleVideoPaste}
            onKeyDown={handleBackspace}
          />
        </div>
      </div>
    </div>
  );
};

MultiAudioVideoInput.propTypes = {
  label: PropTypes.string,
  values: PropTypes.string,
  setValues: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export { MultiAudioVideoInput };
