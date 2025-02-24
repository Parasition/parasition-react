import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Image } from 'components/UI/image';
import styles from './styles.module.css';

const Input = (props) => {
  const {
    label,
    id,
    name,
    value,
    onChange = () => {},
    onKeyDown = () => {},
    placeholder,
    disabled,
    hasError,
    type = 'text',
    containerStyle,
    inputLabelStyle,
    inputStyle,
    leftIcon,
    leftIconStyle,
    onClickLeftIcon,
    rightIcon,
    rightIconStyle,
    onClickRightIcon,
    inputReference,
    inputErrorStyle,
    ...rest
  } = props;

  return (
    <div className={classNames(styles.inputWrapperStyle, containerStyle)}>
      {label && (
        <label
          className={classNames(styles.inputLabelStyle, inputLabelStyle)}
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <React.Fragment>
        {leftIcon && (
          <Image
            image={leftIcon}
            customImageContainerStyle={classNames(
              styles.leftIconStyle,
              leftIconStyle
            )}
            onClick={onClickLeftIcon}
          />
        )}
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          className={classNames(styles.inputStyle, inputStyle)}
          onChange={onChange}
          placeholder={placeholder || ''}
          onKeyDown={onKeyDown}
          ref={inputReference}
          disabled={disabled}
          {...rest}
        />
        {rightIcon && (
          <Image
            image={rightIcon}
            customImageContainerStyle={classNames(
              styles.rightIconStyle,
              rightIconStyle
            )}
            onClick={onClickRightIcon}
          />
        )}
      </React.Fragment>

      {hasError && (
        <span className={classNames(styles.inputErrorStyle, inputErrorStyle)}>
          {hasError}
        </span>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  hasError: PropTypes.string,
  numberOfRows: PropTypes.number,
  containerStyle: PropTypes.string,
  inputLabelStyle: PropTypes.string,
  inputStyle: PropTypes.string,
  leftIcon: PropTypes.string,
  leftIconStyle: PropTypes.string,
  onClickLeftIcon: PropTypes.func,
  rightIcon: PropTypes.string,
  rightIconStyle: PropTypes.string,
  onClickRightIcon: PropTypes.func,
  inputReference: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  inputErrorStyle: PropTypes.string,
};

export default Input;
