import React from 'react';
import PropTypes from 'prop-types';
import { Image } from '../image';
import { upArrowGreenIcon } from 'resources/images';
import strings from 'resources/strings/eng.json';
import styles from './styles.module.css';

const StatisticCard = ({ title, totalCount, count, pastLabel }) => {
  return (
    <div className={styles.viewCampaign_statisticCard}>
      <h5 className={styles.viewCampaign_statisticTitle}>{title}</h5>
      <div className={styles.viewCampaign_countAndIndicator}>
        <h6 className={styles.viewCampaign_statisticSubTitle}>
          {totalCount > 0 && totalCount < 10
            ? `0${totalCount}`
            : totalCount || '-'}
        </h6>

        <div className={styles.viewCampaign_viewsIndicatorAndPastDays}>
          <div className={styles.viewCampaign_Indicator}>
            <label className={styles.viewCampaign_count}>
              {' '}
              {count > 0 && count < 10 ? `0${count}` : count || 0}
            </label>
            <Image
              image={upArrowGreenIcon}
              customImageContainerStyle={styles.viewCampaign_upArrowIcon}
              altText={strings.upArrowGreenIcon}
            />
          </div>
          <p className={styles.viewCampaign_pastDays}>({pastLabel})</p>
        </div>
      </div>
    </div>
  );
};

StatisticCard.propTypes = {
  title: PropTypes.string.isRequired,
  totalCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  pastLabel: PropTypes.string.isRequired,
};

export default StatisticCard;
