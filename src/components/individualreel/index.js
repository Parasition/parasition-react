import React, { useEffect, useRef, useState } from 'react';
import { Image } from 'components/UI/image';
import { FaPause } from 'react-icons/fa';
import { playWhiteIcon } from 'resources/images';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const IndividualReel = ({ videoUrl, customContainerStyle }) => {
  const videoRef = useRef(null);
  const iframeRef = useRef(null);
  const tiktokRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null); // YouTube Player API

  const isYouTubeUrl =
    videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
  const isTikTokUrl = videoUrl.includes('tiktok.com');
  const isDirectVideo = /\.(mp4|webm|ogg)$/i.test(videoUrl);

  // Extract YouTube Video ID & Construct Embed URL
  const getYouTubeEmbedUrl = () => {
    try {
      let videoId = '';
      if (videoUrl.includes('youtube.com')) {
        videoId = new URL(videoUrl).searchParams.get('v');
      } else if (videoUrl.includes('youtu.be')) {
        videoId = videoUrl.split('/').pop();
      }
      return videoId
        ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1`
        : null;
    } catch (error) {
      console.error('Error parsing YouTube URL:', error);
      return null;
    }
  };

  const embedUrl = getYouTubeEmbedUrl();

  // Load YouTube API
  useEffect(() => {
    if (isYouTubeUrl && iframeRef.current) {
      window.onYouTubeIframeAPIReady = () => {
        setPlayer(new window.YT.Player(iframeRef.current));
      };
      if (!window.YT) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        document.body.appendChild(script);
      } else {
        setPlayer(new window.YT.Player(iframeRef.current));
      }
    }
  }, [videoUrl]);

  // Load TikTok Embed Script
  useEffect(() => {
    if (isTikTokUrl && tiktokRef.current) {
      const script = document.createElement('script');
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [videoUrl]);

  // Play/Pause Handler
  const handlePlayClick = () => {
    if (isDirectVideo && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
    if (isYouTubeUrl && player) {
      player.getPlayerState?.() === 1
        ? player.pauseVideo()
        : player.playVideo();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className={classNames(
        styles.individualReel_container,
        customContainerStyle
      )}
      onClick={handlePlayClick}
    >
      {isYouTubeUrl ? (
        <iframe
          ref={iframeRef}
          className={styles.video}
          src={embedUrl}
          title="YouTube Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : isTikTokUrl ? (
        <blockquote
          ref={tiktokRef}
          className="tiktok-embed"
          cite={videoUrl}
          data-video-id={videoUrl.split('/').pop()}
          style={{ maxWidth: '100%', minWidth: '300px' }}
        >
          <a href={videoUrl}>View TikTok Video</a>
        </blockquote>
      ) : isDirectVideo ? (
        <video
          ref={videoRef}
          className={styles.video}
          src={videoUrl}
          loop
          muted
        />
      ) : (
        <p className={styles.errorText}>Unsupported video format</p>
      )}

      {isDirectVideo && (
        <div className={styles.individualReel_playIconView}>
          {isPlaying ? (
            <FaPause className={styles.individualReel_pauseIcon} />
          ) : (
            <Image
              image={playWhiteIcon}
              altText="playWhiteOutlineIcon"
              customImageContainerStyle={styles.individualReel_playIcon}
            />
          )}
        </div>
      )}
    </div>
  );
};

IndividualReel.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  customContainerStyle: PropTypes.string,
};

export default IndividualReel;
