import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.css';
import strings from 'resources/strings/eng.json';
import { Image } from '../image';
import { dummyProfileIcon } from 'resources/images';
import IndividualReel from 'components/individualreel';

const ResultsCard = ({
  videoUrl,
  profileImage = dummyProfileIcon,
  profileName = '@Madeline',
  profileDesc = 'Som att vinna på lotto #hair #fyp #foryou #blonde',
  views = '110,1k',
  likes = '18,7k',
  comments = '5,2k',
  shares = '2,9k',
  linkText = 'https://www.tiktok.com/@_theasextra...',
  containerStyle,
  topSectionStyle,
  songNameStyle,
  imageAndDetailsStyle,
  reelDetailsStyle,
  profileBoxStyle,
  profileDetailsStyle,
  profileImgStyle,
  profileNameStyle,
  profileDescStyle,
  videoStatisticsStyle,
  videoStatisticsLabelStyle,
}) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(linkText).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  return (
    <div className={classNames(styles.resultsCard_container, containerStyle)}>
      <div className={classNames(styles.rc_topSection, topSectionStyle)}>
        <p className={classNames(styles.rc_songName_text, songNameStyle)}>
          Song name
        </p>

        <div
          className={classNames(
            styles.rc_image_and_details,
            imageAndDetailsStyle
          )}
        >
          <IndividualReel
            videoUrl={videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'}
          />
          <div className={classNames(styles.rc_reelDetails, reelDetailsStyle)}>
            <div className={classNames(styles.rc_profileBox, profileBoxStyle)}>
              <div
                className={classNames(
                  styles.rc_profileDetails,
                  profileDetailsStyle
                )}
              >
                <Image
                  image={profileImage}
                  altText="profileImg"
                  customImageContainerStyle={classNames(
                    styles.rc_profileImg,
                    profileImgStyle
                  )}
                />
                <h6
                  className={classNames(
                    styles.rc_profileName,
                    profileNameStyle
                  )}
                >
                  {profileName}
                </h6>
              </div>
              <p
                className={classNames(styles.rc_profileDesc, profileDescStyle)}
              >
                {profileDesc}
              </p>
            </div>
            <div
              className={classNames(
                styles.rc_videoStatistics,
                videoStatisticsStyle
              )}
            >
              <p
                className={classNames(
                  styles.rc_videoStatisticsLabel,
                  videoStatisticsLabelStyle
                )}
              >
                {strings.views}&nbsp;{views}
              </p>
              <p
                className={classNames(
                  styles.rc_videoStatisticsLabel,
                  videoStatisticsLabelStyle
                )}
              >
                {strings.likes}&nbsp;{likes}
              </p>
              <p
                className={classNames(
                  styles.rc_videoStatisticsLabel,
                  videoStatisticsLabelStyle
                )}
              >
                {strings.comments}&nbsp;{comments}
              </p>
              <p
                className={classNames(
                  styles.rc_videoStatisticsLabel,
                  videoStatisticsLabelStyle
                )}
              >
                {strings.shares}&nbsp;{shares}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rc_bottomSection}>
        <p
          className={styles.rc_linkText}
          onClick={handleCopyLink}
          style={{ cursor: 'pointer' }}
        >
          {linkText}
        </p>
      </div>
    </div>
  );
};

ResultsCard.propTypes = {
  videoUrl: PropTypes.string,
  profileImage: PropTypes.string,
  profileName: PropTypes.string,
  profileDesc: PropTypes.string,
  views: PropTypes.string,
  likes: PropTypes.string,
  comments: PropTypes.string,
  shares: PropTypes.string,
  linkText: PropTypes.string,
  containerStyle: PropTypes.string,
  topSectionStyle: PropTypes.string,
  songNameStyle: PropTypes.string,
  imageAndDetailsStyle: PropTypes.string,
  reelDetailsStyle: PropTypes.string,
  profileBoxStyle: PropTypes.string,
  profileDetailsStyle: PropTypes.string,
  profileImgStyle: PropTypes.string,
  profileNameStyle: PropTypes.string,
  profileDescStyle: PropTypes.string,
  videoStatisticsStyle: PropTypes.string,
  videoStatisticsLabelStyle: PropTypes.string,
};

export default ResultsCard;
