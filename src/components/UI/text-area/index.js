import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const TextArea = (props) => {
  // PROPS

  const {
    // VALUES
    label,
    name,
    value,
    placeholder,
    errorMsg,

    // FUNCTIONS
    onChange = () => {},
    onFocus = () => {},

    // STYLES
    textAreaInputStyle,
    customErrorMsgStyle,
  } = props;

  return (
    <div className={styles.textArea_container}>
      <label className={styles.textarea_label}>{label}</label>
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        className={classNames(styles.textArea_input, textAreaInputStyle)}
      />
      {errorMsg && (
        <p
          className={classNames(styles.textArea_errorMsg, customErrorMsgStyle)}
        >
          {errorMsg}
        </p>
      )}
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  errorMsg: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  textAreaInputStyle: PropTypes.string,
  customErrorMsgStyle: PropTypes.string,
};

export default TextArea;
