import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import strings from 'resources/strings/eng.json';
import { Image } from '../image';
import { dummyProfileIcon, upArrowWhiteIcon } from 'resources/images';
import IndividualReel from 'components/individualreel';
import { Button } from '../button';
import styles from './styles.module.css';

const ResultsCard = ({
  title,
  videoUrl,
  profileImage = dummyProfileIcon,
  profileName = '@Madeline',
  profileDesc = 'Som att vinna på lotto #hair #fyp #foryou #blonde',
  views = '110,1k',
  likes = '18,7k',
  comments = '5,2k',
  shares = '2,9k',
  linkText = 'https://www.tiktok.com/@_theasextra...',
  boost_code,
  handleCopyVideoLink,
  handleCopyBoostLink,
  className,
  resultWithAI = false,
}) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(linkText).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  return (
    <div className={classNames(styles.resultsCard_container, className)}>
      <h5 className={classNames(styles.resultsCard_title)}>{title}</h5>

      <div className={styles.resultsCard_subContainer}>
        <div className={styles.resultsCard_detailsWrapper}>
          <IndividualReel
            videoUrl={
              videoUrl ? videoUrl : 'https://www.w3schools.com/html/mov_bbb.mp4'
            }
          />

          <div className={styles.resultsCard_details}>
            <div className={styles.resultsCard_profileBox}>
              <div className={styles.resultsCard_profileDetails}>
                <Image
                  image={profileImage}
                  altText="profileImg"
                  customImageContainerStyle={styles.resultsCard_profileImg}
                />
                <h6 className={styles.resultsCard_profileName}>
                  {profileName}
                </h6>
              </div>
              <p className={styles.resultsCard_profileDesc}>{profileDesc}</p>
            </div>
            <div className={styles.resultsCard_statistics}>
              <p className={styles.resultsCard_statisticsLabel}>
                {strings.views}&nbsp; {views}
              </p>
              <p className={styles.resultsCard_statisticsLabel}>
                {strings.likes}&nbsp; {likes}
              </p>
              <p className={styles.resultsCard_statisticsLabel}>
                {strings.comments}&nbsp; {comments}
              </p>
              <p className={styles.resultsCard_statisticsLabel}>
                {strings.shares}&nbsp; {shares}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.resultsCard_linksInputsAndBoostBtn}>
          <div className={styles.resultsCard_copyLinkBox}>
            {videoUrl && (
              <div className={styles.resultsCard_copyLinkAndLabel}>
                <div className={styles.resultsCard_link}>
                  <p className={styles.resultsCard_linkText}>{videoUrl}</p>
                </div>
                {!resultWithAI && (
                  <label
                    className={styles.resultsCard_copyLinkLabel}
                    onClick={handleCopyVideoLink}
                  >
                    {strings.copyLink}
                  </label>
                )}
              </div>
            )}
            {boost_code && (
              <div className={styles.resultsCard_copyLinkAndLabel}>
                <div className={styles.resultsCard_link}>
                  <p className={styles.resultsCard_linkTextSparkCode}>
                    {boost_code}
                  </p>
                </div>
                {!resultWithAI && (
                  <label
                    className={styles.resultsCard_copyLinkLabel}
                    onClick={handleCopyBoostLink}
                  >
                    {strings.copySparkCode}
                  </label>
                )}
              </div>
            )}
          </div>
          {boost_code && (
            <Button
              title={strings.boostVideo}
              icon={upArrowWhiteIcon}
              icoAltText={strings.upArrowWhiteIcon}
              onClick={handleCopyBoostLink}
              buttonIconStyle={styles.resultsCard_upArrowIcon}
              classname={styles.resultsCard_boostVideoBtn}
            />
          )}
        </div>
      </div>
    </div>
  );
};

ResultsCard.propTypes = {
  title: PropTypes.string,
  videoUrl: PropTypes.string,
  profileImage: PropTypes.string,
  profileName: PropTypes.string,
  profileDesc: PropTypes.string,
  views: PropTypes.string,
  likes: PropTypes.string,
  comments: PropTypes.string,
  shares: PropTypes.string,
  linkText: PropTypes.string,
  boost_code: PropTypes.string,
  handleCopyVideoLink: PropTypes.func,
  handleCopyBoostLink: PropTypes.func,
  resultWithAI: PropTypes.bool,
  className: PropTypes.string,
};

export default ResultsCard;
