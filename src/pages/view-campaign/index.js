import React, { useEffect, useState } from 'react';
import { Image } from 'components/UI/image';
import {
  defaultAudioPreviewIcon,
  downChevronBlackIcon,
  dummyProfileIcon,
  upArrowGreenIcon,
  upArrowWhiteIcon,
} from 'resources/images';
import ReelCard from 'components/reel';
import { BudgetIndicator } from 'components/budgetindicator';
import { Button } from 'components/UI/button';
import IndividualReel from 'components/individualreel';
import { Constants } from 'utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToastHook } from 'hooks/usetoasthook';
import strings from 'resources/strings/eng.json';
import moment from 'moment';
import { getCompaignDetailsApi } from 'networking/apis/compaign';
import styles from './styles.module.css';
import StatisticCard from 'components/UI/statisicks-card';

const ViewCampaign = () => {
  const location = useLocation();
  const campaign = location.state || null;

  // HOOKS

  const { showToast } = useToastHook();

  // CONSTANTS
  const { routeNames } = Constants();

  // ROUTING
  const navigate = useNavigate();

  // STATES
  const [selectedReel, setSelectedReel] = useState(null);
  const [campaignDetails, setCampaignDetails] = useState(null);
  const [totalStats, setTotalStats] = useState({
    views: 0,
    likes: 0,
    shares: 0,
    comments: 0,
  });
  const [statsIncrease, setStatsIncrease] = useState({
    views: 0,
    shares: 0,
    likes: 0,
    comments: 0,
  });
  const [copyLinks, setCopyLinks] = useState({
    copyLink: false,
    copySparkAdCode: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getCampaignDetails();
  }, [campaign]);

  useEffect(() => {
    if (!campaignDetails?.videos) return;

    const aggregatedStats = campaignDetails.videos.reduce(
      (acc, video) => {
        acc.views += video.stats?.view_count || 0;
        acc.likes += video.stats?.like_count || 0;
        acc.shares += video.stats?.share_count || 0;
        acc.comments += video.stats?.comment_count || 0;
        return acc;
      },
      { views: 0, likes: 0, shares: 0, comments: 0 }
    );

    let increasedViewCount = 0;
    let increasedLikeCount = 0;
    let increasedShareCount = 0;
    let increasedCommentCount = 0;
    const aggregatedStats2 = campaignDetails.videos.map((video, index) => {
      const filterDate = moment().subtract(3, 'days').format('YYYY-MM-DD');
      let data = video?.creator_videos_stats.filter((videoStats) => {
        return !moment(videoStats.stats_date).isAfter(filterDate);
      });

      increasedViewCount +=
        video.stats?.view_count - (data[0]?.stats?.view_count || 0);
      increasedLikeCount +=
        video.stats?.like_count - (data[0]?.stats?.like_count || 0);
      increasedShareCount +=
        video.stats?.share_count - (data[0]?.stats?.share_count || 0);
      increasedCommentCount +=
        video.stats?.comment_count - (data[0]?.stats?.comment_count || 0);
    });
    setStatsIncrease({
      views: increasedViewCount,
      shares: increasedShareCount,
      likes: increasedLikeCount,
      comments: increasedCommentCount,
    });
    setTotalStats(aggregatedStats);
  }, [campaignDetails]);

  const getCampaignDetails = async () => {
    try {
      const response = await getCompaignDetailsApi(campaign.campaign_id);
      setCampaignDetails(response.data.data);
      setSelectedReel(response.data.data?.videos[0]);
    } catch (error) {
      showToast.error(error.message);
      console.error('Error while fetching campaigns details', error);
    }
  };

  // const handleDiffeDays = (date) => {
  //   if (date) {
  //     let now = moment();
  //     let createdMoment = moment(date);

  //     let diffDays = now.diff(createdMoment, 'days');
  //     let diffMonths = now.diff(createdMoment, 'months');
  //     let diffYears = now.diff(createdMoment, 'years');

  //     if (diffDays <= 7) {
  //       return diffDays === 0 ? 'today' : `In the last ${diffDays} days`;
  //     } else if (diffMonths === 0) {
  //       return 'In the last month';
  //     } else if (diffMonths > 0 && diffYears === 0) {
  //       return `In the last ${diffMonths} months`;
  //     } else {
  //       return `In the last ${diffYears} years`;
  //     }
  //   }
  // };

  const handleCopyLink = (text, type) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopyLinks((prevState) => ({
          ...prevState,
          [type]: true,
        }));

        setTimeout(() => {
          setCopyLinks((prevState) => ({
            ...prevState,
            [type]: false,
          }));
        }, 3000);
      })
      .catch((err) => {
        showToast.error('Failed to copy link: ', err);
      });
  };

  const renderBudgetSpend = () => {
    return (
      <div className={styles.viewCampaign_headerAndBudgetSpend}>
        <div className={styles.viewCampaign_header}>
          <h1 className={styles.viewCampaign_headerTitle}>
            {campaignDetails?.name || campaignDetails?.objective}
          </h1>
          <h4 className={styles.viewCampaign_headerSubTitle}>
            {campaignDetails?.description}
          </h4>
        </div>
        <div className={styles.viewCampaign_budgetSpend}>
          <BudgetIndicator
            totalAmount={campaignDetails?.budget?.total}
            spentAmount={campaignDetails?.budget?.starting_fund}
          />
          <div className={styles.viewCampaign_campaignDetails}>
            <div className={styles.viewCampaign_dueAndStartDate}>
              <h6 className={styles.viewCampaign_dueDate}>
                {strings.campaignDue}{' '}
                {moment(campaignDetails?.end_date).format('MMM D')}
              </h6>
              <label className={styles.viewCampaign_startDate}>
                {strings.campaignStart}{' '}
                {moment(campaignDetails?.start_date).format('MMM D')}
              </label>
            </div>
            <Button
              title={strings.extendCampaign}
              onClick={() =>
                navigate(routeNames.extendCampaign, {
                  state: { campaign: campaignDetails },
                })
              }
              classname={styles.viewCampaign_extendCampaignBtn}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderStatisticsAndGallery = () => {
    return (
      <div className={styles.viewCampaign_statisticsAndGallery}>
        {renderAudio()}
        {renderStatistics()}
        {renderTopVideosGallery()}
      </div>
    );
  };

  const renderAudio = () => {
    return (
      <div className={styles.viewCampaign_audioDetails}>
        <Image
          image={defaultAudioPreviewIcon}
          altText={strings.defaultAudioPreviewIcon}
          customImageContainerStyle={styles.viewCampaign_audioImg}
        />
        <div className={styles.viewCampaign_audioTrackTitleAndDesc}>
          <h5 className={styles.viewCampaign_audioTrackTitle}>
            {campaignDetails?.objective}
          </h5>
          <h6 className={styles.viewCampaign_audioTrackSubTitle}>
            {campaignDetails?.description}
          </h6>
        </div>
      </div>
    );
  };

  const renderStatistics = () => {
    return (
      <div className={styles.viewCampaign_statisticListItems}>
        <StatisticCard
          title={'Views'}
          totalCount={totalStats.views}
          count={statsIncrease.views}
          pastLabel={'last 3 days'}
        />
        <StatisticCard
          title={'Likes'}
          totalCount={totalStats.likes}
          count={statsIncrease.likes}
          pastLabel={'last 3 days'}
        />
        <StatisticCard
          title={'Shares'}
          totalCount={totalStats.shares}
          count={statsIncrease.shares}
          pastLabel={'last 3 days'}
        />
        <StatisticCard
          title={'Comments'}
          totalCount={totalStats.comments}
          count={statsIncrease.comments}
          pastLabel={'last 3 days'}
        />
      </div>
    );
  };

  const renderTopVideosGallery = () => {
    return (
      <div className={styles.viewCampaign_topVideos}>
        <div className={styles.viewCampaign_topVideoHeader}>
          {strings.topVideos}
        </div>
        {campaignDetails?.videos?.length > 0 ? (
          <React.Fragment>
            <div className={styles.viewCampaign_videoGallery}>
              {campaignDetails?.videos?.map((reelData, index) => {
                return (
                  <ReelCard
                    key={index}
                    src={reelData.url}
                    views={reelData?.stats?.view_count}
                    selectedReel={
                      selectedReel &&
                      selectedReel.stats?.view_count ===
                        reelData.stats?.view_count
                    }
                    onPressReel={() => setSelectedReel(reelData)}
                  />
                );
              })}
            </div>
            <div className={styles.viewCampaign_chevronIconView}>
              <Image
                image={downChevronBlackIcon}
                altText={strings.downChevronBlackIcon}
                onClick={() => {}}
                customImageContainerStyle={styles.viewCampaign_downChevronIcon}
                customImageStyle={styles.viewCampaign_downChevronFit}
              />
            </div>
          </React.Fragment>
        ) : (
          <p className={styles.viewCampaign_videoGalleryEmpty}>Not available</p>
        )}
      </div>
    );
  };

  const renderIndividualVideo = () => {
    const sparkAdCode = '#Gju6EAEHh2cK9nisoI7PH9CsNv1pOyIZ5Djpk6...';

    return (
      <div className={styles.viewCampaign_selectVideoBoxAndCopyLink}>
        <div className={styles.viewCampaign_selectedVideoBox}>
          <h5 className={styles.viewCampaign_selectedVideoTitle}>
            {strings.selectedVideo}
          </h5>

          <div className={styles.viewCampaign_videoOverViewAndLinks}>
            <div className={styles.viewCampaign_videoOverviewDetails}>
              <IndividualReel
                videoUrl={
                  selectedReel
                    ? selectedReel.url
                    : 'https://www.w3schools.com/html/mov_bbb.mp4'
                }
              />

              <div className={styles.viewCampaign_reelDetails}>
                <div className={styles.viewCampaign_profileBox}>
                  <div className={styles.viewCampaign_profileDetails}>
                    <Image
                      image={dummyProfileIcon}
                      altText="profileImg"
                      customImageContainerStyle={styles.viewCampaign_profileImg}
                    />
                    <h6 className={styles.viewCampaign_profileName}>
                      {selectedReel?.creator_social_name}
                    </h6>
                  </div>
                  <p className={styles.viewCampaign_profileDesc}>
                    {selectedReel?.desc}
                  </p>
                </div>
                <div className={styles.viewCampaign_videoStatistics}>
                  <p className={styles.viewCampaign_videoStatisticsLabel}>
                    {strings.views}&nbsp; {selectedReel?.stats?.view_count}
                  </p>
                  <p className={styles.viewCampaign_videoStatisticsLabel}>
                    {strings.likes}&nbsp; {selectedReel?.stats?.like_count}
                  </p>
                  <p className={styles.viewCampaign_videoStatisticsLabel}>
                    {strings.comments}&nbsp;{' '}
                    {selectedReel?.stats?.comment_count}
                  </p>
                  <p className={styles.viewCampaign_videoStatisticsLabel}>
                    {strings.shares}&nbsp; {selectedReel?.stats?.share_count}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.viewCampaign_linksInputsAndBoostBtn}>
              <div className={styles.viewCampaign_copyLinkBox}>
                <div className={styles.viewCampaign_copyLinkAndLabel}>
                  <div className={styles.viewCampaign_link}>
                    <p className={styles.viewCampaign_linkText}>
                      {selectedReel?.url}
                    </p>
                  </div>
                  <label
                    className={styles.viewCampaign_copyLinkLabel}
                    onClick={() => handleCopyLink(selectedReel.url, 'copyLink')}
                  >
                    {strings.copyLink}
                  </label>
                </div>
                <div className={styles.viewCampaign_copyLinkAndLabel}>
                  <div className={styles.viewCampaign_link}>
                    <p className={styles.viewCampaign_linkTextSparkCode}>
                      {sparkAdCode}
                    </p>
                  </div>
                  <label
                    className={styles.viewCampaign_copyLinkLabel}
                    onClick={() =>
                      handleCopyLink(sparkAdCode, 'copySparkAdCode')
                    }
                  >
                    {strings.copySparkCode}
                  </label>
                </div>
              </div>
              <Button
                title={strings.boostVideo}
                icon={upArrowWhiteIcon}
                icoAltText={strings.upArrowWhiteIcon}
                onClick={() => handleCopyLink(sparkAdCode, 'copySparkAdCode')}
                startIconStyle={styles.viewCampaign_upArrowIcon}
                classname={styles.viewCampaign_boostVideoBtn}
              />
            </div>
          </div>
        </div>

        {copyLinks.copySparkAdCode && (
          <div className={styles.viewCampaign_codeCopyBox}>
            Spark Ad Code Successfully Copied!
          </div>
        )}

        {copyLinks.copyLink && (
          <div className={styles.viewCampaign_codeCopyBox}>
            Video Link Successfully Copied!
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.viewCampaign_container}>
      {renderBudgetSpend()}
      <div className={styles.viewCampaign_subContainer}>
        {renderStatisticsAndGallery()}
        {selectedReel && renderIndividualVideo()}
      </div>
    </div>
  );
};

export default ViewCampaign;
