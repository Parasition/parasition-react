import React from 'react';
import strings from 'resources/strings/eng.json';
import { Image } from '../image';
import styles from './styles.module.css';

const AudioCard = (props) => {
  const { trackImage, trackName, trackSinger, duration, views, link } = props;
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
          <p className={styles.createCampaign_audioTrackDuration}>{duration}</p>
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
