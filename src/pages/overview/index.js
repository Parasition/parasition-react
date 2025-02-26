import React, { useEffect, useState } from 'react';
import { AddNewFile } from 'components/add-new-file';
import { Button } from 'components/UI/button';
import { Image } from 'components/UI/image';
import {
  defaultAudioPreviewIcon,
  downChevronGrayIcon,
  upArrowGreenIcon,
} from 'resources/images';
import GraphView from 'components/graph';
import { useNavigate } from 'react-router-dom';
import { Constants } from 'utils/constants';
import PopOver from 'components/UI/popover';
import strings from 'resources/strings/eng.json';
import { getCampaignsListApi } from 'networking/apis/compaign';
import moment from 'moment';
import { useToastHook } from 'hooks/usetoasthook';
import { Loader } from 'components/UI/loader';
import styles from './styles.module.css';

const Overview = () => {
  // HOOKS
  const { showToast } = useToastHook();

  // CONSTANTS
  const { routeNames, campaignDaysOptionsData } = Constants();

  // ROUTING
  const navigate = useNavigate();

  // STATES
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerRef, setPickerRef] = useState();
  const [filterRange, setFilterRange] = useState({
    label: '7 days',
    value: 7,
  });
  const [campaignsList, setCampaignsList] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [topCampaigns, setTopCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dates, setDates] = useState([]);
  const [dailyViews, setDailyViews] = useState([]);
  const [totalIncViews, setTotalIncViews] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    getCampaignsList();
  }, []);

  // get campaigns list api
  const getCampaignsList = async () => {
    try {
      setIsLoading(true);
      const response = await getCampaignsListApi();
      setCampaignsList(response.data.data);
      console.log('Campaigns list', response.data.data);
      setIsLoading(false);
    } catch (error) {
      showToast.error(error.message);
      setIsLoading(false);
      console.error('Error while fetching campaigns list', error);
    }
  };

  // Calculate total views of all campaigns
  useEffect(() => {
    if (!campaignsList || campaignsList.length === 0) {
      setTotalViews(0);
      return;
    }
    const calculateTotals = () => {
      let views = 0;

      campaignsList.forEach((campaign) => {
        if (!campaign?.creator_videos) return;

        campaign.creator_videos.forEach((video) => {
          views += video.stats?.view_count || 0;
        });
      });

      setTotalViews(views);
    };

    calculateTotals();
  }, [campaignsList]);

  // Calculate top 3 campaigns based on total views and likes
  useEffect(() => {
    if (!campaignsList || campaignsList.length === 0) {
      setTopCampaigns([]);
      return;
    }
    const sortedCampaigns = [...campaignsList]
      .map((campaign) => {
        if (!campaign?.creator_videos)
          return { ...campaign, totalViews: 0, totalLikes: 0 };

        const totalViews = campaign.creator_videos.reduce(
          (sum, video) => sum + (video.stats?.view_count || 0),
          0
        );
        const totalLikes = campaign.creator_videos.reduce(
          (sum, video) => sum + (video.stats?.like_count || 0),
          0
        );

        return { ...campaign, totalViews, totalLikes };
      })
      .sort((a, b) => {
        if (b.totalViews !== a.totalViews) {
          return b.totalViews - a.totalViews;
        }
        return b.totalLikes - a.totalLikes;
      })
      .slice(0, 3);

    setTopCampaigns(sortedCampaigns);
  }, [campaignsList]);

  // Calculate daily views for each campaign
  useEffect(() => {
    if (!campaignsList || !Array.isArray(campaignsList)) return;

    let dailyViewsMap = new Map();

    campaignsList.forEach((campaign) => {
      if (!campaign.creator_videos) return;

      campaign.creator_videos.forEach((video) => {
        if (!video.video_stats) return;

        let stats = video.video_stats;

        // Sort by date to ensure correct order
        stats.sort((a, b) => new Date(a.stats_date) - new Date(b.stats_date));

        for (let i = 1; i < stats.length; i++) {
          let current = stats[i];
          let previous = stats[i - 1];

          let dailyViewCount =
            current.stats.view_count - previous.stats.view_count;

          let dateKey = new Date(current.stats_date)
            .toISOString()
            .split('T')[0]; // Extract YYYY-MM-DD

          // Aggregate daily views
          dailyViewsMap.set(
            dateKey,
            (dailyViewsMap.get(dateKey) || 0) + dailyViewCount
          );
        }
      });
    });

    // Convert Map to arrays
    let extractedDates = Array.from(dailyViewsMap.keys());
    let extractedDailyViews = Array.from(dailyViewsMap.values());

    setDates(extractedDates);
    setDailyViews(extractedDailyViews);
  }, [campaignsList]);

  // calculate the overall increased views
  useEffect(() => {
    const calculateTotalViews = () => {
      let totalIncreasedViewCount = 0;

      campaignsList?.forEach((camp) => {
        let increasedViewCount = 0;

        camp?.creator_videos?.forEach((video) => {
          let data = video?.video_stats || [];

          if (filterRange.value !== null) {
            const filterDate = moment()
              .subtract(filterRange.value, 'days')
              .format('YYYY-MM-DD');

            data = data.filter(
              (videoStats) => !moment(videoStats.stats_date).isAfter(filterDate)
            );

            increasedViewCount +=
              video.stats?.view_count - (data[0]?.stats?.view_count || 0);
          } else {
            const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');

            const yesterdayData = data.find(
              (videoStats) =>
                moment(videoStats.stats_date).format('YYYY-MM-DD') === yesterday
            );

            increasedViewCount += yesterdayData?.stats?.view_count || 0;
          }
        });

        totalIncreasedViewCount += increasedViewCount;
      });

      if (totalIncreasedViewCount >= 1_000_000)
        return `${Math.floor(totalIncreasedViewCount / 100_000) / 10}M`;
      if (totalIncreasedViewCount >= 1_000)
        return `${Math.floor(totalIncreasedViewCount / 100) / 10}K`;

      return totalIncreasedViewCount || 0;
    };

    setTotalIncViews(calculateTotalViews());
  }, [campaignsList, filterRange]);

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

  const formatViewsCount = (camp) => {
    let increasedViewCount = 0;

    camp?.creator_videos?.forEach((video) => {
      let data = video?.video_stats || [];

      if (filterRange.value !== null) {
        const filterDate = moment()
          .subtract(filterRange.value, 'days')
          .format('YYYY-MM-DD');

        data = data.filter(
          (videoStats) => !moment(videoStats.stats_date).isAfter(filterDate)
        );

        increasedViewCount +=
          video.stats?.view_count - (data[0]?.stats?.view_count || 0);
      } else {
        const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');

        const yesterdayData = data.find(
          (videoStats) =>
            moment(videoStats.stats_date).format('YYYY-MM-DD') === yesterday
        );

        increasedViewCount += yesterdayData?.stats?.view_count || 0;
      }
    });
    if (increasedViewCount >= 1_000_000)
      return `${Math.floor(increasedViewCount / 100_000) / 10}M`;
    if (increasedViewCount >= 1_000)
      return `${Math.floor(increasedViewCount / 100) / 10}K`;

    return increasedViewCount || 0;
  };

  // calculate total view of each campaign
  const calculateTotalViewsofEachCampaign = (data) => {
    return data.reduce((totalViews, video) => {
      return totalViews + video.stats.view_count;
    }, 0);
  };

  // RENDER FUNCTIONS

  const renderOverViewHeader = () => {
    return (
      <div className={styles.overview_headerAndNewCampaignBtn}>
        <div className={styles.overview_header}>
          <h1 className={styles.overview_title}>{strings.overView}</h1>
          <h4 className={styles.overview_subTitle}>
            {strings.overViewAllCampaigns}
          </h4>
        </div>
        <Button
          title={strings.newCampaignButtonTitle}
          class={styles.overview_newCampaignBtn}
          onClick={() => navigate(routeNames.createCampaign)}
        />
      </div>
    );
  };

  const renderCampaignsOverViewList = () => {
    return (
      <div className={styles.overview_headerAndList}>
        <div className={styles.overview_list}>
          <AddNewFile
            onPressPlusIcon={() => navigate(routeNames.createCampaign)}
            addNewFileContainerStyle={styles.add_newFile_container}
            addNewPlusIconStyle={styles.overview_addIcon}
          />
          <div className={styles.overview_listItems}>
            {campaignsList.length > 0 &&
              campaignsList?.map((campaign, index) => {
                return (
                  <div className={styles.overview_listItem} key={index}>
                    <div className={styles.overview_campaignDetails}>
                      <Image
                        image={defaultAudioPreviewIcon}
                        altText={strings.defaultAudioPreviewIcon}
                        customImageContainerStyle={styles.overview_campaignImg}
                      />
                      <div className={styles.overview_campaignTitlesAndView}>
                        <h5 className={styles.overview_campaignDetailsTitle}>
                          {campaign?.name || campaign.objective}
                        </h5>

                        <div className={styles.overview_viewsDetails}>
                          <h6 className={styles.overview_totalViews}>
                            {campaign?.creator_videos?.length > 0
                              ? calculateTotalViewsofEachCampaign(
                                  campaign?.creator_videos
                                )
                              : 0}{' '}
                            Views
                          </h6>
                          <div className={styles.overview_totalViewPastDays}>
                            <div className={styles.overview_totalViewsCount}>
                              <p
                                className={styles.overview_totalViewsCountText}
                              >
                                {formatViewsCount(campaign) ? '+' : ''}
                              </p>
                              <p
                                className={styles.overview_totalViewsCountText}
                              >
                                {formatViewsCount(campaign)}
                              </p>
                            </div>
                            <p
                              className={styles.overview_totalViewLastDaysLabel}
                            >
                              {filterRange.value !== null
                                ? `In the last ${filterRange.value} ${
                                    filterRange.value === 1 ? 'day' : 'days'
                                  }`
                                : 'In the all time'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      title={strings.viewCampaign}
                      onClick={() =>
                        navigate(routeNames.viewCampaign, {
                          state: {
                            campaign_id: campaign?._id,
                            campaign_code: campaign?.campaign_code,
                          },
                        })
                      }
                      classname={styles.overview_campaignBtn}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  };

  const renderTopCampaignsListAndGraph = () => {
    return (
      <div className={styles.overview_topCampaignsListAndGraph}>
        <div className={styles.overview_headingAndGraphDetails}>
          <h5 className={styles.overview_allCampaignsHeading}>
            {strings.allCampaigns}
          </h5>

          <div className={styles.overview_graph_campaignView}>
            <div className={styles.overview_campaignViewsAndDropDown}>
              <div className={styles.overview_campaignViews}>
                <h5 className={styles.overview_campaignViewsHeading}>Views</h5>
                <h4 className={styles.overview_campaignViewsCount}>
                  {totalViews}
                </h4>
                <div className={styles.overview_pastDaysCount}>
                  <div className={styles.overview_viewsCounterIndicator}>
                    <p className={styles.overview_viewsCountInTotal}>
                      {filterRange.value !== null ? totalIncViews : totalViews}
                    </p>
                    <Image
                      image={upArrowGreenIcon}
                      altText="upArrowGreenIcon"
                      customImageContainerStyle={styles.overview_upArrowIcon}
                    />
                  </div>
                  <p className={styles.overview_pastDaysText}>
                    {filterRange.value !== null
                      ? `In the last ${filterRange.value} ${
                          filterRange.value === 1 ? 'day' : 'days'
                        }`
                      : 'In the all time'}
                  </p>
                </div>
              </div>

              <div
                className={styles.overview_daysDropDown}
                onClick={() => setPickerOpen(!pickerOpen)}
                ref={setPickerRef}
              >
                <p className={styles.overview_selectOption}>
                  {filterRange.label}
                </p>
                <Image
                  image={downChevronGrayIcon}
                  altText="downChevronGrayIcon"
                  customImageContainerStyle={
                    pickerOpen
                      ? styles.overview_downChevronTransformedIcon
                      : styles.overview_downChevronGrayIcon
                  }
                  customImageStyle={styles.overview_downChevronGrayIconFit}
                />

                <PopOver
                  reference={pickerRef}
                  show={pickerOpen}
                  onClose={() => setPickerOpen(false)}
                  containerStyle={styles.overview_popOver}
                >
                  <div className={styles.overview_timeOptionsItems}>
                    {campaignDaysOptionsData?.map((option, index) => (
                      <div
                        key={index}
                        className={styles.overview_timeOption}
                        onClick={() => {
                          setPickerOpen(false);
                          setFilterRange(option);
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                </PopOver>
              </div>
            </div>

            <GraphView labels={dates} dataPoints={dailyViews} />
          </div>
        </div>

        <div className={styles.overview_topListDetails}>
          <h4 className={styles.overview_topCampaignHeading}>
            {strings.topCampaigns}
          </h4>

          <div className={styles.overview_topCampaignListItems}>
            {topCampaigns?.map((camp, index) => {
              return (
                <div className={styles.overview_topCampaignListBox} key={index}>
                  <label className={styles.overview_serialNumber}>
                    {index + 1}
                  </label>
                  <div className={styles.overview_topCampaignListItem}>
                    <Image
                      image={defaultAudioPreviewIcon}
                      altText={strings.defaultAudioPreviewIcon}
                      customImageContainerStyle={
                        styles.overview_topCampaignIcon
                      }
                      customImageStyle={styles.overview_topCampaignIconFit}
                    />
                    <label className={styles.overview_topCampaignLabel}>
                      {camp?.name || camp.objective}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.overview_container}>
      {isLoading && <Loader />}
      {renderOverViewHeader()}
      <div className={styles.overview_subContainer}>
        {renderCampaignsOverViewList()}
        {renderTopCampaignsListAndGraph()}
      </div>
    </div>
  );
};

export default Overview;
