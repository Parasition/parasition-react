import React, { useEffect, useRef, useState } from 'react';
import { Accordion } from 'components/UI/accordion';
import { CampaignPreview } from 'components/campaign-preview';
import DatePicker from 'components/datepicker';
import Input from 'components/UI/input';
import { Constants } from 'utils/constants';
import { useToastHook } from 'hooks/usetoasthook';
import { useLocation, useNavigate } from 'react-router-dom';
import strings from 'resources/strings/eng.json';
import moment from 'moment';
import { extendBudgetApi } from 'networking/apis/compaign';
import {
  openEyeBlackIcon,
  playBlackIcon,
  profileBlackIcon,
} from 'resources/images';
import styles from './styles.module.css';

const ExtendCampaign = () => {
  const location = useLocation();
  const campaign = location.state?.campaign || null;

  // CONSTANTS
  const { routeNames } = Constants();

  // ROUTING

  const navigate = useNavigate();

  // STATES
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [openPicker, setOpenPicker] = useState(null);
  const [extendStartDate, setExtendStartDate] = useState(
    campaign?.start_date || ''
  );
  const [extendEndDate, setExtendEndDate] = useState(campaign?.end_date || '');
  const [extendedBudget, setExtendedBudget] = useState(
    campaign?.budget?.total || ''
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // HOOKS
  const { showToast } = useToastHook();

  const [previewData, setPreviewData] = useState([
    {
      icon: playBlackIcon,
      label: 'Total Videos',
      count: '',
    },
    {
      icon: profileBlackIcon,
      label: 'Estimate Unique Creators',
      count: '',
    },
    {
      icon: openEyeBlackIcon,
      label: 'Estimate Total Views',
      count: '',
    },
  ]);

  const budgetData = {
    1500: { videos: [21, 33], views: [165000, 210000] },
    2000: { videos: [28, 44], views: [220000, 280000] },
    3000: { videos: [42, 66], views: [330000, 420000] },
    4000: { videos: [57, 88], views: [440000, 570000] },
    5000: { videos: [71, 111], views: [555000, 710000] },
    7500: { videos: [107, 166], views: [775000, 1100000] },
    10000: { videos: [142, 222], views: [950000, 1420000] },
    15000: { videos: [214, 333], views: [1275000, 2120000] },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let budgetKey = 1500; // Default to 1500 EUR

    // If the exact budget exists in budgetData, use it; otherwise, fallback to 1500
    if (budgetData[campaign?.budget.total]) {
      budgetKey = campaign?.budget.total;
    }

    const { videos, views } = budgetData[budgetKey];

    setPreviewData([
      {
        icon: playBlackIcon,
        label: 'Total Videos',
        count: `${videos[1]}`,
      },
      {
        icon: profileBlackIcon,
        label: 'Estimate Unique Creators',
        count: `${Math.floor(videos[1] / 2)}`,
      },
      {
        icon: openEyeBlackIcon,
        label: 'Estimate Total Views',
        count: `${views[1].toLocaleString()}`,
      },
    ]);
  }, [campaign?.budget.total]);

  // FUNCTION : To toggle accordion
  const toggleAccordion = () => {
    setIsAccordionOpen((prevState) => !prevState);
  };

  const isFutureDate = moment(campaign.start_date).isAfter(moment(), 'day');

  // FUNCTION : Tap on extend campaign Btn

  const tapOnExtendCampaignBtn = async () => {
    if (!extendStartDate) {
      showToast.error('Start date is required.');
      return;
    }
    if (!extendEndDate) {
      showToast.error('End date is required.');
      return;
    }
    if (!extendedBudget) {
      showToast.error('Budget is required.');
      return;
    }

    let data = {
      _id: campaign._id,
      start_date: extendStartDate,
      end_date: extendEndDate,
      budget: extendedBudget,
    };

    try {
      setIsLoading(true);
      const response = await extendBudgetApi(data);
      setIsLoading(false);
      setExtendedBudget('');
      setExtendStartDate('');
      setExtendEndDate('');
      showToast.success(strings.campaignExtendedSuccessfully);
      // Navigate after success
      setTimeout(() => {
        navigate(routeNames.overView);
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      showToast.error(error.message || 'Failed to extend the campaign.');
      console.error('API Error:', error);
    }
  };

  const renderExtendCampaignHeader = () => {
    return (
      <div className={styles.extendCampaign_header}>
        <h1 className={styles.extendCampaign_title}>
          {strings.extendCampaign}
        </h1>
        <h4 className={styles.extendCampaign_subTitle}>
          {strings.createNewCampaign}
        </h4>
      </div>
    );
  };

  const renderIncreaseBudgetAndPreview = () => {
    return (
      <div className={styles.extendCampaign_budgetAccordionAndPreview}>
        {renderBudgetAccordion()}
        {renderPreviewCampaign()}
      </div>
    );
  };

  const renderBudgetAccordion = () => {
    return (
      <Accordion
        title={strings.budget}
        showAccordionContent={isAccordionOpen}
        onPressAccordionHeader={toggleAccordion}
        onPressChevRonIcon={toggleAccordion}
        accordionContentStyle={styles.extendCampaign_budgetAccordion}
        customAccordionContainerStyle={
          styles.extendCampaign_budgetAccordionContainer
        }
      >
        <div className={styles.extendCampaign_budgetAndDatePicker}>
          <div className={styles.extendCampaign_budgetTitleAndInput}>
            <Input
              label={strings.increasedBudget}
              name="increaseBudget"
              value={extendedBudget}
              onChange={(e) => setExtendedBudget(e.target.value)}
            />
          </div>
          <div className={styles.extendCampaign_calenderWrapper}>
            <p className={styles.extendCampaign_calenderLabel}>Change Dates</p>
            <div className={styles.extendCampaign_calender}>
              <DatePicker
                isOpen={openPicker === 'start'}
                onToggle={(isOpen) => setOpenPicker(isOpen ? 'start' : null)}
                value={extendStartDate}
                onChange={(date) => setExtendStartDate(date)}
                disabled={!isFutureDate}
              />
              <p className={styles.createCampaign_toText}>to</p>
              <DatePicker
                isOpen={openPicker === 'end'}
                onToggle={(isOpen) => setOpenPicker(isOpen ? 'end' : null)}
                value={extendEndDate}
                onChange={(date) => setExtendEndDate(date)}
              />
            </div>
          </div>
        </div>
      </Accordion>
    );
  };

  const renderPreviewCampaign = () => {
    return (
      <CampaignPreview
        title={campaign?.name}
        description={campaign?.objective}
        data={previewData}
        budgetLabel="INCREASED BUDGET:"
        sheduleDate={
          extendStartDate &&
          extendEndDate &&
          `${moment(extendStartDate).format('MMM D')} - ${moment(
            extendEndDate
          ).format('MMM D')}`
        }
        budget={
          extendedBudget ||
          (campaign?.budget.total && `${campaign?.budget.total} USD`)
        }
        estimatedCpm="$15 (cost per 1000  views) "
        estimatedCpv="$50 (cost per video)  "
        btnTitle={strings.extendCampaign}
        onPressBtn={() => tapOnExtendCampaignBtn()}
        btnLoader={isLoading}
        btnDisabled={isLoading}
      />
    );
  };

  return (
    <div className={styles.extendCampaign_container}>
      {renderExtendCampaignHeader()}
      {renderIncreaseBudgetAndPreview()}
    </div>
  );
};

export default ExtendCampaign;
