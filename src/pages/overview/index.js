import React, { useEffect, useState } from 'react';
import { AddNewFile } from 'components/add-new-file';
import { Button } from 'components/UI/button';
import { Image } from 'components/UI/image';
import { DummyData } from 'utils/dummy-data';
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
import styles from './styles.module.css';

const Overview = () => {
  // DUMMY DATA
  const { labelsData, dataPoints } = DummyData();

  const { showToast } = useToastHook();

  // CONSTANTS
  const { routeNames, campaignDaysOptionsData } = Constants();

  // ROUTING
  const navigate = useNavigate();

  // STATES
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerRef, setPickerRef] = useState();
  const [campaignFilterDate, setCampaignFilterDate] = useState(null);
  const [campaignsList, setCampaignsList] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [topCampaigns, setTopCampaigns] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getCampaignsList();
  }, []);

  const getCampaignsList = async () => {
    try {
      const response = await getCampaignsListApi();
      console.log('list', response.data.data);
      setCampaignsList(response.data.data);
    } catch (error) {
      showToast.error(error.message);
      console.error('Error while fetching campaigns list', error);
    }
  };

  useEffect(() => {
    if (!campaignsList || campaignsList.length === 0) {
      setTotalViews(0);
      setTotalLikes(0);
      return;
    }

    const calculateTotals = () => {
      let views = 0;
      let likes = 0;

      campaignsList.forEach((campaign) => {
        if (!campaign?.creator_videos) return;

        campaign.creator_videos.forEach((video) => {
          views += video.stats?.view_count || 0;
          likes += video.stats?.like_count || 0;
        });
      });

      setTotalViews(views);
      setTotalLikes(likes);
    };

    calculateTotals();
  }, [campaignsList]);

  // Calculate total views & likes for each campaign
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

  const formatLikeCount = (camp) => {
    // let count = camp?.creator_videos[0]?.stats?.like_count;
    let increasedViewCount = 0;
    camp?.creator_videos.map((video, index) => {
      const filterDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
      let data = video?.video_stats.filter((videoStats) => {
        return !moment(videoStats.stats_date).isAfter(filterDate);
      });

      increasedViewCount +=
        video.stats?.view_count - (data[0]?.stats?.view_count || 0);
    });
    if (increasedViewCount) {
      if (increasedViewCount >= 1000000)
        return `${(increasedViewCount / 1000000).toFixed(1)}M`;
      if (increasedViewCount >= 1000)
        return `${(increasedViewCount / 1000).toFixed(1)}K`;
      return increasedViewCount;
    } else {
      return 0;
    }
  };

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
                            {campaign?.creator_videos[0]?.stats
                              ? campaign?.creator_videos[0]?.stats.view_count
                              : 0}{' '}
                            Views
                          </h6>
                          <div className={styles.overview_totalViewPastDays}>
                            <div className={styles.overview_totalViewsCount}>
                              <p
                                className={styles.overview_totalViewsCountText}
                              >
                                {formatLikeCount(campaign) ? '+' : ''}
                              </p>
                              <p
                                className={styles.overview_totalViewsCountText}
                              >
                                {formatLikeCount(campaign)}
                              </p>
                            </div>
                            <p
                              className={styles.overview_totalViewLastDaysLabel}
                            >
                              In the last 7 days
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
                      {totalLikes}
                    </p>
                    <Image
                      image={upArrowGreenIcon}
                      altText="upArrowGreenIcon"
                      customImageContainerStyle={styles.overview_upArrowIcon}
                    />
                  </div>
                  <p className={styles.overview_pastDaysText}>(last 7 days)</p>
                </div>
              </div>

              <div
                className={styles.overview_daysDropDown}
                onClick={() => setPickerOpen(!pickerOpen)}
                ref={setPickerRef}
              >
                <p className={styles.overview_selectOption}>
                  {campaignFilterDate ? campaignFilterDate : '30d'}
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
                          setCampaignFilterDate(option);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </PopOver>
              </div>
            </div>

            <GraphView labels={labelsData} dataPoints={dataPoints} />
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
      {renderOverViewHeader()}
      <div className={styles.overview_subContainer}>
        {renderCampaignsOverViewList()}
        {renderTopCampaignsListAndGraph()}
      </div>
    </div>
  );
};

export default Overview;
