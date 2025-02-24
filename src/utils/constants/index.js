import {
  femaleIndicatorIcon,
  maleIndicatorIcon,
  openEyeBlackIcon,
  playBlackIcon,
  profileBlackIcon,
} from 'resources/images';

const Constants = () => {
  // ENUMS
  const enums = {
    CAMPAIGN_NAME: 'campaignName',
    CAMPAIGN_OBJECTIVE: 'campaignObjective',
    BRIEF: 'brief',
    TARGET_AUDIENCE: 'targetAudience',
    BUDGET: 'budget',
  };

  // ROUTE NAMES
  const routeNames = {
    createCampaign: '/',
    login: '/login',
    signUp: '/signup',
    overView: '/overview',
    eventCampaign: '/eventcampaign',
    viewCampaign: '/viewcampaign',
    extendCampaign: '/extendcampaign',
    privacyPolicy: '/privacypolicy',
    termsAndConditions: '/terms&conditions',
    breifGenerator: '/briefgenerator',
  };

  // HEADER MENU DATA
  const menuData = [
    {
      name: 'Create Campaign',
      route: routeNames.createCampaign,
    },
    {
      name: 'Overview',
      route: routeNames.overView,
    },
    // {
    //   name: 'Brief Generator ',
    //   route: routeNames.breifGenerator,
    // },

    // TODO: LATER ADD THIS ROUTE
    // {
    //   name: 'Event Campaign',
    //   route: routeNames.eventCampaign,
    // },
  ];

  // GENDER STATISTICS DATA

  const genderStatisticsData = [
    {
      icon: maleIndicatorIcon,
      percentage: '60%',
      gender: 'Male',
    },
    {
      icon: femaleIndicatorIcon,
      percentage: '40%',
      gender: 'Female',
    },
  ];

  // CAMPAIGN PREVIEW STATISTICS DATA
  const campaignPreviewStatisticsData = [
    {
      icon: playBlackIcon,
      label: 'Total Videos',
      count: ' 100',
    },
    {
      icon: profileBlackIcon,
      label: 'Estimate Unique Creators',
      count: '50',
    },
    {
      icon: openEyeBlackIcon,
      label: 'Estimate Total Views',
      count: '2 000 000',
    },
  ];

  // EXTEND CAMPAIGN PREVIEW STATISTIC DATA
  const extendCampaignPreviewStatisticsData = [
    {
      icon: playBlackIcon,
      label: 'Additional Videos',
      count: '+100',
    },
    {
      icon: profileBlackIcon,
      label: 'Estimate Additional Creators',
      count: '+50',
    },
    {
      icon: openEyeBlackIcon,
      label: 'Estimate Additional Views',
      count: '+2 000 000',
    },
  ];

  // CAMPAIGN OPTIONS DATA
  const campaignDaysOptionsData = [
    '1 day',
    '7 days',
    '90 days',
    '1 year',
    'all time',
  ];

  return {
    enums,
    routeNames,
    menuData,
    genderStatisticsData,
    campaignPreviewStatisticsData,
    extendCampaignPreviewStatisticsData,
    campaignDaysOptionsData,
  };
};

export { Constants };
