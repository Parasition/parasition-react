import React, { useRef } from 'react';
import { FaPause } from 'react-icons/fa';
import { Image } from 'components/UI/image';
import { playWhiteOutlineIcon } from 'resources/images';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const ReelCard = (props) => {
  // PROPS
  const { views, src, selectedReel, onPressReel = () => {} } = props;

  const videoRef = useRef(null);

  const isPlaying = false;

  // TODO: IF need add later

  // const togglePlay = () => {
  //   if (videoRef.current) {
  //     if (isPlaying) {
  //       videoRef.current.pause();
  //     } else {
  //       videoRef.current.play();
  //     }
  //     setIsPlaying(!isPlaying);
  //   }
  // };

  return (
    <div
      className={
        selectedReel
          ? styles.reelCard_selectedReelCardContainer
          : styles.reelCard_Container
      }
      onClick={onPressReel}
    >
      <video ref={videoRef} className={styles.video} src={src} loop />

      <div className={styles.reelCard_playAndViews}>
        <div
          className={styles.playIcon}
          // onClick={(e) => {
          //   togglePlay();
          //   e.stopPropagation();
          // }}
        >
          {isPlaying ? (
            <FaPause />
          ) : (
            <Image
              image={playWhiteOutlineIcon}
              altText="playWhiteOutlineIcon"
              // onClick={(e) => {
              //   togglePlay();
              //   e.stopPropagation();
              // }}
              customImageContainerStyle={styles.reelCard_playIcon}
            />
          )}
        </div>
        <div className={styles.reelCard_views}>{views}</div>
      </div>
    </div>
  );
};

ReelCard.propTypes = {
  views: PropTypes.string,
  src: PropTypes.string,
  selectedReel: PropTypes.string,
  onPressReel: PropTypes.func,
  togglePlay: PropTypes.func,
};

export default ReelCard;
