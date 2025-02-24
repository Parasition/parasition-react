import React, { useRef } from 'react';
import useDragDropHook from 'hooks/usedragdrophook';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const FileUploadInput = (props) => {
  // props:
  const {
    label,
    setSelectedFile,
    accept,
    image,
    customLabelStyle,
    customUploadIconStyle,
  } = props;

  // refs:
  const fileInputRef = useRef(null);

  // hook for the drag and drop functionality
  const { dragOverProps } = useDragDropHook((file) => setSelectedFile(file));

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUploadFile = (event) => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div {...dragOverProps}>
      <input
        type="file"
        onChange={handleFileChange}
        className={styles.inputStyle}
        id="fileInput"
        accept={accept}
        ref={fileInputRef}
      />
      {label ? (
        <label
          htmlFor="fileInput"
          className={classNames(styles.labelTextStyle, customLabelStyle)}
          onClick={handleUploadFile}
        >
          {label}
        </label>
      ) : (
        <div
          className={classNames(
            styles.uploadIconBlockStyle,
            customUploadIconStyle
          )}
          onClick={handleUploadFile}
        >
          <img src={image} alt={''} className={styles.imageStyle} />
        </div>
      )}
    </div>
  );
};

FileUploadInput.propTypes = {
  label: PropTypes.string,
  setSelectedFile: PropTypes.func,
  accept: PropTypes.string,
  image: PropTypes.string,
  customLabelStyle: PropTypes.string,
  customUploadIconStyle: PropTypes.string,
};

export default FileUploadInput;
