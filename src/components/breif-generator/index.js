import React, { useState } from 'react';
import strings from 'resources/strings/eng.json';
import { MultiAudioVideoInput } from 'components/UI/multi-audio-video-input';
import { Image } from 'components/UI/image';
import PropTypes from 'prop-types';
import {
  clockArrowIcon,
  closeGrayIcon,
  defaultAudioPreviewIcon,
  documentGrayIcon,
  fileUploadGrayIcon,
  plusGrayIcon,
} from 'resources/images';
import ResultsCard from 'components/UI/results-card';
import AudioCard from 'components/UI/audio-card';
import { Button } from 'components/UI/button';
import FileUploadInput from 'components/fileuploadInput';
import styles from './styles.module.css';

const BreifGenerator = (props) => {
  const { onClose } = props;

  //state
  const [videoLinks, setVideoLinks] = useState([]);
  const [uploadedAudioFile, setUploadedAudioFile] = useState({});

  // FUNCTION: To handle audio file upload
  const handelSelectedFile = (file) => {
    if (file) {
      setUploadedAudioFile(file);
    }
  };

  const renderTopSection = () => {
    return (
      <div className={styles.bg_topSection}>
        <div className={styles.bg_tiktok_link}>
          <MultiAudioVideoInput
            type="audio"
            label={strings.addSoundOfCampaign}
            values={videoLinks}
            setValues={setVideoLinks}
            placeholder={strings.pasteTikTokLinkPlaceHolder}
            customMultiValueInput_subContainer={
              styles.bg_audio_link_subContainer
            }
            custom_inputField={styles.bg_inputField}
          />

          {/* <div className={styles.bg_soundPreviewAndNewSound}>
            {videoLinks?.map((audio, index) => {
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
          </div> */}

          {/* <div className={styles.bg_add_multiFile}>
            <Image
              image={plusGrayIcon}
              altText="plus-icon"
              customImageContainerStyle={styles.bg_plusImg}
            />
          </div> */}

          {/* <div className={styles.bg_uploadAudioFileAndPreview}>
            <div className={styles.bg_uploadAudio}>
              <label className={styles.bg_uploadLabel}>
                {strings.addSoundNotYetTikTok}
              </label>

              <div
                className={
                  isDragging
                    ? styles.bg_uploadDropBoxActive
                    : styles.bg_uploadDropBox
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
            {uploadedAudioFile.name && (
              <div className={styles.bg_uploadedAudioPreview}>
                <Image
                  image={documentGrayIcon}
                  altText={strings.documentGrayIcon}
                  customImageContainerStyle={styles.bg_documentGrayIcon}
                />
                <label className={styles.bg_uploadPreviewLabel}>
                  {uploadedAudioFile.name}
                </label>
              </div>
            )}
          </div> */}

          <div className={styles.bg_btnAndRotateIcon}>
            <Button
              title="Find Video Formats"
              classname={styles.bg_find_video_btn}
            />
            <Image image={clockArrowIcon} altText="rotate-icon" />
          </div>
        </div>
      </div>
    );
  };

  const renderBottomSection = () => {
    return (
      <div className={styles.bg_bottomSection}>
        <div className={styles.bg_BottomTitle}>
          <p className={styles.bg_reults_text}>Results</p>
        </div>
        <div className={styles.bg_resultCards}>
          {[...Array(3)].map((_, index) => (
            <ResultsCard
              resultWithAI={true}
              title={'Song name'}
              key={index}
              videoUrl={'https://www.tiktok.com/@_theasextra...'}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.breifGenerator_container}>
      <div className={styles.breifGenerator_topTitle}>
        <p className={styles.bg_breifGenerator_text}>Brief Generator</p>
        <Image
          image={closeGrayIcon}
          altText="rotate-icon"
          onClick={onClose}
          customImageContainerStyle={styles.breifGenerator_closeIcon}
        />
      </div>
      {renderTopSection()}
      {renderBottomSection()}
    </div>
  );
};

BreifGenerator.propTypes = {
  onClose: PropTypes.func,
};

export default BreifGenerator;
