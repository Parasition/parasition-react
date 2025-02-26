import React from 'react';
import strings from 'resources/strings/eng.json';
import { Image } from '../image';
import styles from './styles.module.css';

const AudioCard = (props) => {
  const { trackImage, trackName, trackSinger, duration, views, link } = props;

  // FUNCTION : To format the duration
  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.createCampaign_soundPreview}>
      <div className={styles.createCampaign_audioDetails}>
        <Image
          image={trackImage}
          altText={strings.defaultAudioPreviewIcon}
          customImageContainerStyle={styles.createCampaign_audioPreviewIcon}
          customImageStyle={styles.createCampaign_audioPreviewObjectFit}
        />
        <div className={styles.createCampaign_audioDescDetails}>
          <div className={styles.createCampaign_audioTrackTitleAndSubTitle}>
            <h5 className={styles.createCampaign_audioTrackTitle}>
              {trackName}
            </h5>
            <p className={styles.createCampaign_audioTrackSubTitle}>
              {trackSinger}
            </p>
          </div>
          <p className={styles.createCampaign_audioTrackDuration}>
            {formatDuration(duration)}
          </p>
        </div>
      </div>
      <div className={styles.createCampaign_audioViewsDetails}>
        <a
          href={link}
          target="_blank"
          className={styles.createCampaign_viewInTikTok}
        >
          View in TikTok
        </a>
        <p className={styles.createCampaign_audioTrackViewers}>{views}</p>
      </div>
    </div>
  );
};

export default AudioCard;
