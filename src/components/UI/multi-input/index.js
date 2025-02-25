import React from 'react';
import { Image } from 'components/UI/image';
import { closeGrayIcon } from 'resources/images';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const MultiValueInput = (props) => {
  // PROPS

  const { label, values, setValues, placeholder } = props;

  // FUNCTION : To paste the value
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const newValues = pasteData.split(/[\n, ]+/).filter(Boolean);
    setValues((prevValues) => [...prevValues, ...newValues]);
  };

  // FUNCTION: To delete value onclick the close icon
  const handleDelete = (index) => {
    const updatedValues = [...values];
    updatedValues.splice(index, 1);
    setValues(updatedValues);
  };

  // FUNCTION : To remove value while hit backspace
  const handleBackspace = (e) => {
    if (e.key === 'Backspace' && e.target.value === '' && values.length > 0) {
      setValues((prevValues) => prevValues.slice(0, -1));
    }
  };

  return (
    <div className={styles.multiValueInput_container}>
      <label className={styles.multiValueInput_label}>{label}</label>
      <div className={styles.multiValueInput_subContainer}>
        <div className={styles.multiValueInput_tagWrapper}>
          {values &&
            values?.map((value, index) => (
              <div className={styles.multiValueInput_tagItem} key={index}>
                <label className={styles.multiValueInput_tagValue}>
                  {value}
                </label>
                <Image
                  image={closeGrayIcon}
                  altText="closeGrayIcon"
                  onClick={() => handleDelete(index)}
                  customImageContainerStyle={
                    styles.multiValueInput_closeGrayIcon
                  }
                  customImageStyle={styles.multiValueInput_closeGrayFit}
                />
              </div>
            ))}
          <input
            type="text"
            placeholder={placeholder}
            className={styles.inputField}
            onPaste={handlePaste}
            onKeyDown={handleBackspace}
          />
        </div>
      </div>
    </div>
  );
};

MultiValueInput.propTypes = {
  label: PropTypes.string,
  values: PropTypes.string,
  setValues: PropTypes.func,
  placeholder: PropTypes.string,
};

export { MultiValueInput };
