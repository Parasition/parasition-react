import {
  defaultAudioPreviewIcon,
  dummyOverViewListImg1,
  dummyOverViewListImg2,
  dummyOverViewListImg3,
} from 'resources/images';

const DummyData = () => {
  const overViewListData = [
    {
      image: dummyOverViewListImg1,
      title: 'Luther Vandross - This Close to You',
      views: ' 2.3 m Views',
      totalCount: '+200k',
      pastDays: ' In the last 7 days ',
    },
    {
      image: defaultAudioPreviewIcon,
      title: 'Girlfriend - Omar Rudberg',
      views: ' 5.5 m Views',
      totalCount: '+800k',
      pastDays: ' In the last 7 days ',
    },
    {
      image: dummyOverViewListImg2,
      title: 'In kom en ängel - Myriam Bryant',
      views: ' 2.3 m Views',
      totalCount: '+800k',
      pastDays: ' In the last 7 days ',
    },
    {
      image: dummyOverViewListImg3,
      title: 'Överallt - Dizzy',
      views: ' 2.3 m Views',
      totalCount: '+800k',
      pastDays: ' In the last 7 days ',
    },
    {
      image: defaultAudioPreviewIcon,
      title: 'Never Been Yours - Benny Benassi ',
      views: ' 2.3 m Views',
      totalCount: '+800k',
      pastDays: ' In the last 7 days ',
    },
  ];

  const topCampaignsData = [
    {
      sNo: '1',
      image: dummyOverViewListImg1,
      label: 'This Close To You - Luther Vandross',
    },
    {
      sNo: '2',
      image: dummyOverViewListImg2,
      label: 'In kom en ängel - Myriam Bryant ',
    },
    {
      sNo: '3',
      image: dummyOverViewListImg3,
      label: 'Överallt - Dizzy',
    },
  ];

  const labelsData = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
    'Jan-2',
    'Feb-2',
    'Mar-2',
    'Apr-2',
    'May-2',
    'Jun-2',
  ];

  const dataPoints = [
    20, 50, 35, 70, 40, 38, 50, 80, 65, 70, 75, 85, 150, 90, 100, 120, 110, 115,
    125, 140, 150, 160,
  ];

  const reelLinksData = [
    {
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      views: '110,1k',
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      views: '90,3k',
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      views: '75,8k',
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      views: '45,6k',
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      views: '120,4k',
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      views: '200,7k',
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      views: '160,3k',
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
      views: '130,9k',
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
      views: '85,1k',
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
      views: '70,4k',
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
      views: '95,2k',
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/GoogleChromecast.mp4',
      views: '150,5k',
    },
  ];

  const viewCampaignStatisticsData = [
    {
      title: 'Views',
      totalCount: '5.5 M',
      count: '600k',
    },
    {
      title: 'Likes ',
      totalCount: '415 k',
      count: '30k',
    },
    {
      title: 'Shares',
      totalCount: '223 k',
      count: '21k',
    },
    {
      title: 'Videos',
      totalCount: '355',
      count: '55',
    },
  ];

  return {
    overViewListData,
    topCampaignsData,
    labelsData,
    dataPoints,
    reelLinksData,
    viewCampaignStatisticsData,
  };
};

export { DummyData };
