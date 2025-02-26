import React from 'react';
import { Image } from 'components/UI/image';
import { closeGrayIcon } from 'resources/images';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.css';

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
    disabled = false,
  } = props;

  // FUNCTION : To paste the value
  const handleAudioPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');

    // Split pasted data by newlines, commas, or spaces
    const newValues = pasteData.split(/[\n, ]+/).filter(Boolean);

    // TikTok Audio Validation (Supports `sound` and `music`)
    const tikTokAudioRegex = /tiktok\.com\/music\/.+-(\d+)/;

    // YouTube Video Validation (Supports `watch?v=`, `shorts/`, and `youtu.be/`)
    const youTubeRegex =
      /^https?:\/\/(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)[\w-]+/;

    // SoundCloud Track Validation (User/track format)
    const soundCloudRegex =
      /^https?:\/\/(www\.)?soundcloud\.com\/[\w-]+\/[\w-]+\/?$/;

    // Spotify Track Preview Validation
    const spotifyRegex =
      /^https?:\/\/p\.scdn\.co\/mp3-preview\/[\w]+(\?cid=[\w]+)?$/;

    // Instagram Reels Audio Validation
    const instagramAudioRegex =
      /^https?:\/\/(www\.)?instagram\.com\/reels\/audio\/\d+\/?$/;

    // General Direct Audio File Link Validation (.mp3, .wav, .ogg, etc.)
    const directAudioRegex =
      /^https?:\/\/.*\.(mp3|wav|aac|flac|ogg|m4a)(\?.*)?$/;

    // Validate links
    const validLinks = newValues.filter(
      (link) =>
        tikTokAudioRegex.test(link) ||
        youTubeRegex.test(link) ||
        soundCloudRegex.test(link) ||
        spotifyRegex.test(link) ||
        instagramAudioRegex.test(link) ||
        directAudioRegex.test(link)
    );

    if (validLinks.length === 0) {
      alert('Please paste a valid audio file link.');
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
      /^(https?:\/\/)?(www\.)?(tiktok\.com\/@([\w\.-]+)\/video\/(\d{19})|vm\.tiktok\.com\/([\w-]{9}))\/?(\?.*)?$/i;

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
            disabled={disabled}
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
  disabled: PropTypes.bool,
};

export { MultiAudioVideoInput };
