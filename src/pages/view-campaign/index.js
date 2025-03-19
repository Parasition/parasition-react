import React, { useEffect, useState } from 'react';
import { Image } from 'components/UI/image';
import {
  defaultAudioPreviewIcon,
  downChevronBlackIcon,
} from 'resources/images';
import ReelCard from 'components/reel';
import { BudgetIndicator } from 'components/budgetindicator';
import { Button } from 'components/UI/button';
import IndividualReel from 'components/individualreel';
import { Constants } from 'utils/constants';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useToastHook } from 'hooks/usetoasthook';
import strings from 'resources/strings/eng.json';
import moment from 'moment';
import { getCompaignDetailsApi } from 'networking/apis/compaign';
import StatisticCard from 'components/UI/statisicks-card';
import ResultsCard from 'components/UI/results-card';
import FallbacUi from 'components/fallback-ui';
import styles from './styles.module.css';

const ViewCampaign = () => {
  const location = useLocation();
  const { id } = useParams();
  // const campaign = location.state || null;

  // HOOKS

  const { showToast } = useToastHook();

  // CONSTANTS
  const { routeNames } = Constants();

  // ROUTING
  const navigate = useNavigate();

  // STATES
  const [selectedReel, setSelectedReel] = useState(null);
  const [campaignDetails, setCampaignDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
  }, [id]);

  // Initialize the total stats and stats increase
  useEffect(() => {
    if (!campaignDetails?.creator_videos) return;

    const aggregatedStats = campaignDetails.creator_videos.reduce(
      (acc, video) => {
        if (!video.video_stats || video.video_stats.length === 0) return acc;

        const latestStats = video.video_stats.reduce((latest, stat) => {
          return !latest ||
            new Date(stat.stats_date) > new Date(latest.stats_date)
            ? stat
            : latest;
        }, null);

        if (latestStats?.stats) {
          acc.views += latestStats.stats.view_count || 0;
          acc.likes += latestStats.stats.like_count || 0;
          acc.shares += latestStats.stats.share_count || 0;
          acc.comments += latestStats.stats.comment_count || 0;
        }

        return acc;
      },
      { views: 0, likes: 0, shares: 0, comments: 0 }
    );

    let increasedViewCount = 0;
    let increasedLikeCount = 0;
    let increasedShareCount = 0;
    let increasedCommentCount = 0;
    const aggregatedStats2 = campaignDetails.creator_videos.map(
      (video, index) => {
        const filterDate = moment().subtract(3, 'days').format('YYYY-MM-DD');
        let data = video?.video_stats.filter((videoStats) => {
          return moment(videoStats.stats_date).isSameOrAfter(filterDate);
        });

        if (data.length === 0) {
          increasedViewCount += 0;
          increasedLikeCount += 0;
          increasedShareCount += 0;
          increasedCommentCount += 0;
        }

        increasedViewCount +=
          video.stats?.view_count - (data[0]?.stats?.view_count || 0);
        increasedLikeCount +=
          video.stats?.like_count - (data[0]?.stats?.like_count || 0);
        increasedShareCount +=
          video.stats?.share_count - (data[0]?.stats?.share_count || 0);
        increasedCommentCount +=
          video.stats?.comment_count - (data[0]?.stats?.comment_count || 0);
      }
    );
    setStatsIncrease({
      views: increasedViewCount,
      shares: increasedShareCount,
      likes: increasedLikeCount,
      comments: increasedCommentCount,
    });
    setTotalStats(aggregatedStats);
  }, [campaignDetails]);

  // get campaign details api call
  const getCampaignDetails = async () => {
    try {
      setIsLoading(true);
      const response = await getCompaignDetailsApi(id);
      setCampaignDetails(response.data.data);
      setSelectedReel(response.data.data?.creator_videos[0]);
      setIsLoading(false);
    } catch (error) {
      showToast.error(error.message);
      setIsLoading(false);
      console.error('Error while fetching campaigns details', error);
    }
  };

  // handle copy link
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

  // Function to format counts
  const formatCount = (count) => {
    if (count >= 1_000_000) return `${Math.floor(count / 100_000) / 10}M`;
    if (count >= 1_000) return `${Math.floor(count / 100) / 10}K`;
    return count.toString();
  };

  // RENDER METHODS

  const renderBudgetSpend = () => {
    return (
      <div className={styles.viewCampaign_headerAndBudgetSpend}>
        <div className={styles.viewCampaign_header}>
          <p className={styles.viewCampaign_headerTitle}>
            {campaignDetails?.name || campaignDetails?.objective}
          </p>
          <p className={styles.viewCampaign_headerSubTitle}>
            {campaignDetails?.description}
          </p>
        </div>
        <div className={styles.viewCampaign_budgetSpend}>
          <BudgetIndicator
            totalAmount={campaignDetails?.budget?.total}
            spentAmount={campaignDetails?.budget?.starting_fund || 0}
          />
          <div className={styles.viewCampaign_campaignDetails}>
            <div className={styles.viewCampaign_dueAndStartDate}>
              <p className={styles.viewCampaign_dueDate}>
                {strings.campaignDue}{' '}
                {moment(campaignDetails?.end_date).format('MMM D')}
              </p>
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
          <p className={styles.viewCampaign_audioTrackTitle}>
            {campaignDetails?.objective}
          </p>
          <p className={styles.viewCampaign_audioTrackSubTitle}>
            {campaignDetails?.description}
          </p>
        </div>
      </div>
    );
  };

  const renderStatistics = () => {
    return (
      <div className={styles.viewCampaign_statisticListItems}>
        <StatisticCard
          title={'Views'}
          totalCount={formatCount(totalStats.views)}
          count={formatCount(statsIncrease.views)}
          pastLabel={'last 3 days'}
        />
        <StatisticCard
          title={'Likes'}
          totalCount={formatCount(totalStats.likes)}
          count={formatCount(statsIncrease.likes)}
          pastLabel={'last 3 days'}
        />
        <StatisticCard
          title={'Shares'}
          totalCount={formatCount(totalStats.shares)}
          count={formatCount(statsIncrease.shares)}
          pastLabel={'last 3 days'}
        />
        <StatisticCard
          title={'Comments'}
          totalCount={formatCount(totalStats.comments)}
          count={formatCount(statsIncrease.comments)}
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
        {campaignDetails?.creator_videos?.length > 0 ? (
          <React.Fragment>
            <div className={styles.viewCampaign_videoGallery}>
              {campaignDetails?.creator_videos?.map((reelData, index) => {
                return (
                  <ReelCard
                    key={index}
                    src={reelData.url}
                    views={formatCount(reelData?.stats?.view_count)}
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
    return (
      <div className={styles.viewCampaign_selectVideoBoxAndCopyLink}>
        <ResultsCard
          title={strings.selectedVideo}
          videoUrl={selectedReel?.url}
          profileName={selectedReel?.creator_id}
          profileDesc={selectedReel?.desc}
          views={selectedReel?.stats?.view_count}
          likes={selectedReel?.stats?.like_count}
          comments={selectedReel?.stats?.comment_count}
          shares={selectedReel?.stats?.share_count}
          boost_code={selectedReel?.boost_code}
          handleCopyVideoLink={() => {
            handleCopyLink(selectedReel.url, 'copyLink');
          }}
          handleCopyBoostLink={() =>
            handleCopyLink(selectedReel?.boost_code, 'copySparkAdCode')
          }
        />
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
      {isLoading ? (
        <FallbacUi />
      ) : (
        <>
          {renderBudgetSpend()}
          <div className={styles.viewCampaign_subContainer}>
            {renderStatisticsAndGallery()}
            {selectedReel && renderIndividualVideo()}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewCampaign;
