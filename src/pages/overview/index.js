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
import { data, useNavigate } from 'react-router-dom';
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
          if (!video?.video_stats || video.video_stats.length === 0) return;

          // Get the latest video stats based on stats_date
          const latestStats = video.video_stats.reduce((latest, current) => {
            return new Date(current.stats_date) > new Date(latest.stats_date)
              ? current
              : latest;
          }, video.video_stats[0]);

          views += latestStats.stats?.view_count || 0;
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

  // calculate the overall increased views
  useEffect(() => {
    const calculateTotalViews = () => {
      let totalIncreasedViewCount = 0;

      campaignsList?.forEach((camp) => {
        let increasedViewCount = 0;

        camp?.creator_videos?.forEach((video) => {
          let data = video?.video_stats || [];

          // If video_stats is empty, skip calculations
          if (!data.length) return;

          if (filterRange.value !== null) {
            const filterDate = moment()
              .subtract(filterRange.value, 'days')
              .format('YYYY-MM-DD');

            data = data.filter((videoStats) =>
              moment(videoStats.stats_date).isSameOrAfter(filterDate)
            );

            if (data.length === 0) {
              return (increasedViewCount = 0);
            }

            increasedViewCount +=
              video.stats?.view_count - (data[0]?.stats?.view_count || 0);
          } else {
            // Find the latest date entry in video_stats
            const latestStats = data.reduce((latest, current) => {
              return moment(current.stats_date).isAfter(
                moment(latest.stats_date)
              )
                ? current
                : latest;
            }, data[0]);

            increasedViewCount += latestStats?.stats?.view_count || 0;
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

  // Function to format counts
  const formatCount = (count) => {
    if (count >= 1_000_000) return `${Math.floor(count / 100_000) / 10}m`;
    if (count >= 1_000) return `${Math.floor(count / 100) / 10}k`;
    return count.toString();
  };

  const formatViewsCount = (camp) => {
    let increasedViewCount = 0;

    camp?.creator_videos?.forEach((video) => {
      let data = video?.video_stats;

      if (!data || data.length === 0) {
        increasedViewCount += 0;
        return;
      }

      if (filterRange.value !== null) {
        // Get the date range for filtering
        const filterDate = moment()
          .subtract(filterRange.value, 'days')
          .format('YYYY-MM-DD');

        data = data.filter((videoStats) =>
          moment(videoStats.stats_date).isSameOrAfter(filterDate)
        );

        if (data.length === 0) {
          return (increasedViewCount = 0);
        }

        increasedViewCount +=
          video.stats?.view_count - (data[0]?.stats?.view_count || 0);
      } else {
        // Find the latest date entry in video_stats
        const latestStats = data.reduce((latest, current) => {
          return moment(current.stats_date).isAfter(moment(latest.stats_date))
            ? current
            : latest;
        }, data[0]);

        increasedViewCount += latestStats?.stats?.view_count || 0;
      }
    });
    return formatCount(increasedViewCount || 0);
  };

  // calculate total view of each campaign
  const calculateTotalViewsofEachCampaign = (data) => {
    return data.reduce((total, campaign) => {
      if (!campaign.video_stats || campaign.video_stats.length === 0)
        return total;

      // Find the latest video_stats entry based on stats_date
      const latestStats = campaign.video_stats.reduce((latest, current) =>
        new Date(current.stats_date) > new Date(latest.stats_date)
          ? current
          : latest
      );

      return formatCount(total + (latestStats.stats.view_count || 0));
    }, 0);
  };

  // Calculate views of each campaign for map
  useEffect(() => {
    if (!campaignsList || !Array.isArray(campaignsList)) return;
    const lastDates = [];

    if (filterRange.value !== null) {
      lastDates.push(
        ...Array.from({ length: filterRange.value }, (_, i) =>
          moment()
            .subtract(i + 1, 'days')
            .format('YYYY-MM-DD')
        ).reverse()
      );
    } else {
      if (campaignsList.length === 0) return { startDate: null, endDate: null };
      const earliestStartDate = new Date(
        Math.min(...campaignsList.map((c) => new Date(c.start_date)))
      );
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let currentDate = new Date(earliestStartDate);
      while (currentDate <= today) {
        lastDates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    const capms = [];
    lastDates.map((date) => {
      campaignsList.map((camp) => {
        camp.creator_videos.map((video) => {
          const filterVideo = video.video_stats.find(
            (item) => moment(item.stats_date).format('YYYY-MM-DD') === date
          );
          let index = capms.findIndex((item) => item.date === date);
          if (index !== -1) {
            if (filterVideo) {
              capms[index].stats_video.push(filterVideo);
            }
          } else {
            if (filterVideo) {
              capms.push({ date: date, stats_video: [filterVideo] });
            } else {
              capms.push({ date: date, stats_video: [] });
            }
          }
        });
      });
    });
    let updatedCamps = [];
    capms.map((item) => {
      updatedCamps.push({
        date: item.date,
        count: item.stats_video.reduce(
          (acc, curr) => acc + curr.stats.view_count,
          0
        ),
      });
    });
    setDates(lastDates);
    setDailyViews(updatedCamps.map((item) => item.count));
    // console.log('updatedCamps', updatedCamps);
  }, [campaignsList, filterRange]);

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
                        <p className={styles.overview_campaignDetailsTitle}>
                          {campaign?.name || campaign.objective}
                        </p>

                        <div className={styles.overview_viewsDetails}>
                          <p className={styles.overview_totalViews}>
                            {campaign?.creator_videos?.length > 0
                              ? calculateTotalViewsofEachCampaign(
                                  campaign?.creator_videos
                                )
                              : 0}{' '}
                            Views
                          </p>
                          <div className={styles.overview_totalViewPastDays}>
                            <div className={styles.overview_totalViewsCount}>
                              <span>
                                {console.log(
                                  'formatViewsCount(campaign)',
                                  formatViewsCount(campaign)
                                )}
                                {formatViewsCount(campaign) === '0' ? '' : '+'}
                              </span>
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
                        navigate(`${routeNames.viewCampaign}/${campaign._id}`)
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
                  {formatCount(totalViews)}
                </h4>
                <div className={styles.overview_pastDaysCount}>
                  <div className={styles.overview_viewsCounterIndicator}>
                    <p className={styles.overview_viewsCountInTotal}>
                      {totalIncViews}
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
                        <p className={styles.overview_selectOption}>
                          {option.label}
                        </p>
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
