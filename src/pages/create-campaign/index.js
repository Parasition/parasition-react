import React, { useEffect, useState } from 'react';
import { Accordion } from 'components/UI/accordion';
import TextArea from 'components/UI/text-area';
import { Image } from 'components/UI/image';
import {
  defaultAudioPreviewIcon,
  documentGrayIcon,
  dummyVideoPreviewImg,
  fileUploadGrayIcon,
  openEyeBlackIcon,
  playBlackIcon,
  profileBlackIcon,
} from 'resources/images';
import FileUploadInput from 'components/fileuploadInput';
import useDragDropHook from 'hooks/usedragdrophook';
import { Constants } from 'utils/constants';
import Input from 'components/UI/input';
import { CampaignPreview } from 'components/campaign-preview';
import DatePicker from 'components/datepicker';
import { DualRangeSlider } from 'components/UI/dualrangeslider';
import { SingleRangeSlider } from 'components/UI/single-range-slider';
import IndividualReel from 'components/individualreel';
import { useNavigate } from 'react-router-dom';
import strings from 'resources/strings/eng.json';
import { MultiAudioVideoInput } from 'components/UI/multi-audio-video-input';
import SearchInput from 'components/UI/search-input';
import { createCompaignApi } from 'networking/apis/compaign';
import AudioCard from 'components/UI/audio-card';
import Modal from 'components/UI/modal';
import BreifGenerator from 'pages/breif-generator';
import moment from 'moment';
import { useToastHook } from 'hooks/usetoasthook';
import styles from './styles.module.css';

const CreateCampaign = () => {
  // CONSTANTS

  const { routeNames, enums, genderStatisticsData } = Constants();

  // ROUTING
  const navigate = useNavigate();

  const { showToast } = useToastHook();

  // STATES
  const [accordions, setAccordions] = useState({
    campaignName: false,
    campaignObjective: false,
    brief: false,
    targetAudience: false,
    budget: false,
  });
  const [name, setName] = useState('');
  const [objective, setObjective] = useState('');
  const [description, setDescription] = useState('');
  const [audios, setAudios] = useState([]);
  const [audioFiles, setAudioFiles] = useState(null);
  const [videos, setVideos] = useState([]);
  const [budget, setBudget] = useState('');
  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);
  const [starting_fund, setStarting_fund] = useState('');
  const [ending_fund, setEnding_fund] = useState('');
  const [places, setPlaces] = useState([]);
  const [ageValues, setAgeValues] = useState([18, 65]);
  const [genderPercentage, setGenderPercentage] = useState([50]);
  const [openPicker, setOpenPicker] = useState(null);
  const [audienceData, setAudienceData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedAudioFile, setUploadedAudioFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [errors, setErrors] = useState({});

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
    if (budget) {
      let budgetKey = 1500; // Default to 1500 EUR

      // If the exact budget exists in budgetData, use it; otherwise, fallback to 1500
      if (budgetData[budget]) {
        budgetKey = budget;
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
    }
  }, [budget]);

  useEffect(() => {
    setAudienceData({
      age: {
        min: ageValues[0],
        max: ageValues[1],
      },
      gender: {
        male: genderPercentage[0],
        female: 100 - genderPercentage[0],
      },
      places: places.map((place) => ({
        place_id: place.place_id || '',
        title: place.title || '',
      })),
    });
  }, [places, ageValues, genderPercentage]);

  // GENDER PERCENTAGE CALCULATION
  const coveredPercentage = (genderPercentage / 100) * 100;

  // HOOKS
  const { dragOverProps, isDragging } = useDragDropHook();

  // FUNCTION : To toggle accordion
  const toggleAccordion = (key) => {
    setAccordions((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  // FUNCTION: To handle audio file upload
  const handelSelectedFile = (file) => {
    if (file) {
      setUploadedAudioFile(file);
    }
  };

  // updatedGenderStatisticsData
  const updatedGenderStatisticsData = genderStatisticsData.map((statistic) => {
    if (statistic.gender === 'Male') {
      return {
        ...statistic,
        percentage: `${Math.round(coveredPercentage)}%`,
      };
    } else if (statistic.gender === 'Female') {
      return {
        ...statistic,
        percentage: `${Math.round(100 - coveredPercentage)}%`,
      };
    }
    return statistic;
  });

  const validateFields = () => {
    let newErrors = {};

    if (!name) newErrors.name = 'Campaign name is required.';
    if (!objective) newErrors.objective = 'Campaign objective is required.';
    if (!description)
      newErrors.description = 'Campaign description is required.';
    if (!audios.length)
      newErrors.audios = 'At least one audio file is required.';
    if (!budget) newErrors.budget = 'Total budget is required.';
    if (!starting_fund) newErrors.starting_fund = 'Starting fund is required.';
    if (!ending_fund) newErrors.ending_fund = 'Ending fund is required.';
    if (!start_date) newErrors.start_date = 'Start date is required.';
    if (!end_date) newErrors.end_date = 'End date is required.';

    setErrors(newErrors);

    // Show the first error message in the toast
    if (Object.keys(newErrors).length > 0) {
      showToast.error(Object.values(newErrors)[0]); // Show first error message
      return false;
    }

    return true;
  };

  const handleLaunchCampaign = async () => {
    if (!validateFields()) return;
    let data = {
      name,
      objective,
      description,
      audios,
      audioFiles,
      videos,
      budget: {
        total: budget,
        starting_fund: starting_fund,
        ending_fund: ending_fund,
      },
      start_date,
      end_date,
      audienceData,
    };
    try {
      setIsLoading(true);
      const response = await createCompaignApi(data);
      if (response) {
        showToast.success('Campaign Created Successfully');
        setName('');
        setObjective('');
        setDescription('');
        setAudios([]);
        setAudioFiles(null);
        setVideos([]);
        setBudget('');
        setStart_date(null);
        setEnd_date(null);
        setStarting_fund('');
        setEnding_fund('');
        setPlaces([]);
        setAgeValues([18, 65]);
        setGenderPercentage([50]);
        setIsLoading(false);
        navigate(routeNames.overView);
      }
    } catch (error) {
      showToast.error(error.message);
      setIsLoading(false);
    }
  };
  // RENDER SECTIONS

  const renderCreateCampaignHeader = () => {
    return (
      <div className={styles.createCampaign_titleAndSubTitle}>
        <h1 className={styles.createCampaign_title}>{strings.newCampaign}</h1>
        <h4 className={styles.createCampaign_subTitle}>
          {strings.createANewCampaign}
        </h4>
      </div>
    );
  };

  const renderCampaignCreation = () => {
    return (
      <div className={styles.createCampaign_accordionSection}>
        {renderCampaignName()}
        {renderCampaignObjective()}
        {renderBrief()}
        {renderTargetAudience()}
        {renderBudget()}
      </div>
    );
  };

  const renderCampaignName = () => {
    return (
      <Accordion
        title={strings.campaignName}
        showAccordionContent={accordions.campaignName}
        onPressChevRonIcon={() => toggleAccordion(enums.CAMPAIGN_NAME)}
        onPressAccordionHeader={() => toggleAccordion(enums.CAMPAIGN_NAME)}
        accordionContentStyle={styles.campaign_objectiveAccordion}
      >
        <Input
          label={strings.campaignNamePlaceHolder}
          name="campaign name"
          value={name}
          placeholder={'please enter campaign name'}
          onChange={(e) => setName(e.target.value)}
          containerStyle={styles.createCampaign_inputContainer}
          inputLabelStyle={styles.createCampaign_inputLabel}
        />
      </Accordion>
    );
  };

  const renderCampaignObjective = () => {
    return (
      <Accordion
        title={strings.createObjective}
        showAccordionContent={accordions.campaignObjective}
        onPressChevRonIcon={() => toggleAccordion(enums.CAMPAIGN_OBJECTIVE)}
        onPressAccordionHeader={() => toggleAccordion(enums.CAMPAIGN_OBJECTIVE)}
        accordionContentStyle={styles.campaign_objectiveAccordion}
      >
        <TextArea
          label={strings.campaignObjectiveLabel}
          name="campaignObjective"
          value={objective}
          placeholder={strings.campaignObjectivePlaceHolder}
          onChange={(e) => setObjective(e.target.value)}
        />
      </Accordion>
    );
  };

  const renderBrief = () => {
    return (
      <Accordion
        title={strings.brief}
        showAccordionContent={accordions.brief}
        btnTitle={'Add with AI'}
        onBtnAction={() => {
          setShowModal(true);
        }}
        onPressChevRonIcon={() => toggleAccordion(enums.BRIEF)}
        onPressAccordionHeader={() => toggleAccordion(enums.BRIEF)}
        accordionContentStyle={styles.campaign_briefAccordion}
      >
        <div className={styles.createCampaign_addTikTokSoundAndNewSound}>
          <div className={styles.createCampaign_textAreaAndPasteLink}>
            <TextArea
              label={strings.briefTextAreaLabel}
              name="brief"
              placeholder={strings.campaignObjectivePlaceHolder}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <MultiAudioVideoInput
              type="audio"
              label={strings.addSoundOfCampaign}
              values={audios}
              setValues={setAudios}
              placeholder={strings.pasteTikTokLinkPlaceHolder}
            />
          </div>

          <div className={styles.createCampaign_soundPreviewAndNewSound}>
            {audios?.map((audio, index) => {
              return (
                <AudioCard
                  key={index}
                  trackName={'In kom en ängel'}
                  trackImage={defaultAudioPreviewIcon}
                  trackSinger={'Myriam Bryant'}
                  duration={'1:00'}
                  views={'560k Videos'}
                  link={audio}
                />
              );
            })}

            {/* <AddNewFile /> */}
          </div>
        </div>

        {/* <div className={styles.createCampaign_uploadAudioFileAndPreview}>
          <div className={styles.createCampaign_uploadAudio}>
            <label className={styles.createCampaign_uploadLabel}>
              {strings.addSoundNotYetTikTok}
            </label>

            <div
              className={
                isDragging
                  ? styles.createCampaign_uploadDropBoxActive
                  : styles.createCampaign_uploadDropBox
              }
              {...dragOverProps}
            >
              <FileUploadInput
                image={fileUploadGrayIcon}
                setSelectedFile={handelSelectedFile}
              />
              <FileUploadInput
                label={strings.chooseFile}
                setSelectedFile={handelSelectedFile}
              />
            </div>
          </div>
          {uploadedAudioFile && (
            <div className={styles.createCampaign_uploadedAudioPreview}>
              <Image
                image={documentGrayIcon}
                altText={strings.documentGrayIcon}
                customImageContainerStyle={
                  styles.createCampaign_documentGrayIcon
                }
              />
              <label className={styles.createCampaign_uploadPreviewLabel}>
                {uploadedAudioFile.name}
              </label>
            </div>
          )}
        </div> */}

        <div className={styles.createCampaign_videoUploadAndPreview}>
          <MultiAudioVideoInput
            type="video"
            label={strings.addVideoLabel}
            values={videos}
            setValues={setVideos}
            placeholder={strings.pasteLinkHere}
          />
          <div className={styles.createCampaign_videoUploadPreview}>
            <Image
              image={dummyVideoPreviewImg}
              altText={strings.videoPreviewImg}
              customImageContainerStyle={styles.createCampaign_videoPreviewImg}
            />

            {videos?.map((link, index) => {
              return (
                <IndividualReel
                  key={index}
                  videoUrl={link}
                  customContainerStyle={styles.createCampaign_videoPreviewBox}
                />
              );
            })}

            {/* <div className={styles.createCampaign_addNewVideoImg}>
              <Image
                image={plusGrayIcon}
                altText={strings.plusGrayIcon}
                onClick={() => {}}
                customImageContainerStyle={
                  styles.createCampaign_addNewVideoIcon
                }
              />
            </div> */}
          </div>
        </div>
      </Accordion>
    );
  };

  const renderTargetAudience = () => {
    return (
      <Accordion
        title={strings.targetAudience}
        subTitle={strings.targetAudienceSubLabel}
        showAccordionContent={accordions.targetAudience}
        onPressChevRonIcon={() => toggleAccordion(enums.TARGET_AUDIENCE)}
        onPressAccordionHeader={() => toggleAccordion(enums.TARGET_AUDIENCE)}
        accordionContentStyle={styles.campaign_objectiveAccordion}
      >
        <div className={styles.createCampaign_ageRange}>
          <h6 className={styles.ageRangeHeading}>{strings.ageRange}</h6>
          <div className={styles.createCampaign_ageRangeValuesAndSeparator}>
            <p className={styles.createCampaign_minRange}>{ageValues[0]}</p>
            <p className={styles.createCampaign_separator}>-</p>
            <p className={styles.createCampaign_maxRange}>{ageValues[1]}</p>
          </div>
        </div>
        <DualRangeSlider
          min={18}
          max={65}
          values={ageValues}
          onChange={setAgeValues}
        />

        <div className={styles.createCampaign_genderStatistics}>
          <label className={styles.createCampaign_genderLabel}>
            {strings.gender}
          </label>

          <div className={styles.createCampaign_genderIndicatorsAndRanger}>
            <div className={styles.createCampaign_genderIndicators}>
              {updatedGenderStatisticsData?.map((statistic, index) => {
                return (
                  <div
                    key={index}
                    className={styles.createCampaign_genderPercentage}
                  >
                    <Image
                      image={statistic.icon}
                      altText={statistic.percentage}
                      onClick={() => {}}
                      customImageContainerStyle={
                        styles.createCampaign_genderIndicator
                      }
                    />
                    <p className={styles.createCampaign_percentageLabel}>
                      {statistic.percentage}
                    </p>
                    <p className={styles.createCampaign_gender}>
                      {statistic.gender}
                    </p>
                  </div>
                );
              })}
            </div>
            <SingleRangeSlider
              min={1}
              max={100}
              value={genderPercentage}
              onChange={setGenderPercentage}
            />
          </div>
        </div>

        <SearchInput selectedPlaces={places} setSelectedPlaces={setPlaces} />
      </Accordion>
    );
  };

  const renderBudget = () => {
    return (
      <Accordion
        title={strings.budget}
        showAccordionContent={accordions.budget}
        onPressChevRonIcon={() => toggleAccordion(enums.BUDGET)}
        onPressAccordionHeader={() => toggleAccordion(enums.BUDGET)}
        accordionContentStyle={styles.campaign_objectiveAccordion}
      >
        <Input
          label={strings.totalBudget}
          type="text"
          name="totalBudget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          classname={styles.createCampaign_totalBudget}
        />

        <div className={styles.createCampaign_calender}>
          <DatePicker
            isOpen={openPicker === 'start'}
            onToggle={(isOpen) => setOpenPicker(isOpen ? 'start' : null)}
            value={start_date}
            onChange={(date) => setStart_date(date)}
            minDate={new Date()}
          />
          <p className={styles.createCampaign_toText}>to</p>
          <DatePicker
            isOpen={openPicker === 'end'}
            onToggle={(isOpen) => setOpenPicker(isOpen ? 'end' : null)}
            value={end_date}
            onChange={(date) => setEnd_date(date)}
            minDate={start_date}
          />
        </div>

        <div className={styles.createCampaign_poInfoAndInputs}>
          <p className={styles.createCampaign_label}>
            {strings.poNumberBelowLabel}
          </p>

          <div className={styles.createCampaign_poInfoInputs}>
            <Input
              label={strings.thirtyPercentageLabel}
              type="text"
              name="totalBudgetThirtyPercent"
              value={starting_fund}
              onChange={(e) => setStarting_fund(e.target.value)}
              classname={styles.createCampaign_totalBudget}
            />

            <Input
              label={strings.seventyPercentageLabel}
              type="text"
              name="totalBudgetSeventyPercent"
              value={ending_fund}
              onChange={(e) => setEnding_fund(e.target.value)}
              classname={styles.createCampaign_totalBudget}
            />
          </div>
        </div>
      </Accordion>
    );
  };

  const renderCampaignPreview = () => {
    return (
      <CampaignPreview
        title={name}
        description={objective}
        data={previewData}
        budgetLabel={strings.totalBudget}
        sheduleDate={
          start_date && end_date
            ? `${moment(start_date).format('MMM D')} - ${moment(
                end_date
              ).format('MMM D')}`
            : ''
        }
        budget={budget && `${budget} USD`}
        estimatedCpm="$15 (cost per 1000  views) "
        estimatedCpv="$50 (cost per video) "
        onPressBtn={() => {
          handleLaunchCampaign();
        }}
        btnLoader={isLoading}
      />
    );
  };

  const renderBriefAIModal = () => {
    return (
      <Modal
        show={showModal}
        handleClickOutSide={() => setShowModal(false)}
        showOverlay={true}
        overlayStyle={styles.overLayStyle}
        containerStyle={styles.createCampaign_breifModal}
      >
        <BreifGenerator onClose={() => setShowModal(false)} />
      </Modal>
    );
  };

  return (
    <div className={styles.createCampaign_container}>
      {renderCreateCampaignHeader()}
      <div className={styles.createCampaign_subContainer}>
        {renderCampaignCreation()}
        {renderCampaignPreview()}
        {renderBriefAIModal()}
      </div>
    </div>
  );
};

export default CreateCampaign;
