import React from 'react';
import { Button } from 'components/UI/button';
import { Image } from 'components/UI/image';
import strings from 'resources/strings/eng.json';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const CampaignPreview = (props) => {
  // PROPS

  const {
    title,
    description,
    data,
    budgetLabel,
    sheduleDate,
    budget,
    estimatedCpm,
    estimatedCpv,
    btnTitle = 'Launch Campaign',
    onPressBtn = () => {},
    btnLoader = false,
    btnDisabled = false,
  } = props;

  const renderCampaignPreviewHeader = () => {
    return (
      <React.Fragment>
        <h4 className={styles.campaignPreview_campaignNameHeading}>{title}</h4>
        <p className={styles.campaignPreview_campaignDescription}>
          {description}
        </p>
      </React.Fragment>
    );
  };

  const renderCampaignPreviewStatistics = () => {
    return (
      <div className={styles.campaignPreview_campaignStatistics}>
        {data?.map((statistics, index) => {
          return (
            <div key={index} className={styles.campaign_listItem}>
              <Image
                image={statistics.icon}
                altText={statistics.label}
                customImageContainerStyle={styles.campaignPreview_listItemIcon}
                customImageStyle={styles.campaignPreview_listItemIconFit}
              />
              <div className={styles.campaignPreview_listItemLabelAndCount}>
                <p className={styles.campaignPreview_listItemLabel}>
                  {statistics.label}
                </p>
                <p className={styles.campaignPreview_listItemCount}>
                  {statistics.count}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderBudgetDetails = () => {
    return (
      <div className={styles.campaignPreview_budgetDetails}>
        <p className={styles.campaignPreview_budgetListItem}>
          {strings.estCPM} : {estimatedCpm}
        </p>
        <p className={styles.campaignPreview_budgetListItem}>
          {strings.estCPV} : {estimatedCpv}
        </p>
        <div className={styles.campaignPreview_budgetListDateAndBudget}>
          <p className={styles.campaignPreview_budgetListItem}>
            {`${strings.campaignShedule} ${sheduleDate}`}
          </p>
          <p className={styles.campaignPreview_budgetListItem}>
            {budgetLabel}: &nbsp;
            <span className={styles.campaignPreview_budgetListItemDesc}>
              {budget}
            </span>
          </p>
        </div>
      </div>
    );
  };

  const renderLaunchCampaignBtn = () => {
    return (
      <Button
        title={btnTitle}
        onClick={onPressBtn}
        classname={styles.campaignPreview_launchCampaignBtn}
        isLoading={btnLoader}
        disabled={btnDisabled}
      />
    );
  };

  return (
    <div className={styles.campaignPreview_previewSection}>
      <h6 className={styles.campaignPreview_previewHeading}>Preview</h6>
      <div className={styles.campaignPreview_campaignDetails}>
        {renderCampaignPreviewHeader()}
        {renderCampaignPreviewStatistics()}
        {renderBudgetDetails()}
        {renderLaunchCampaignBtn()}
      </div>
    </div>
  );
};

CampaignPreview.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  data: PropTypes.any,
  budgetLabel: PropTypes.string,
  sheduleDate: PropTypes.string,
  budget: PropTypes.string,
  estimatedCpm: PropTypes.string,
  estimatedCpv: PropTypes.string,
  btnTitle: PropTypes.string,
  btnLoader: PropTypes.bool,
  btnDisabled: PropTypes.bool,
  onPressBtn: PropTypes.func,
};

export { CampaignPreview };
