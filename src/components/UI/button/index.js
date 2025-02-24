import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Image } from 'components/UI/image';
import { Loader } from 'components/UI/loader';
import styles from './styles.module.css';

const Button = (props) => {
  const {
    title,
    onClick,
    disabled = false,
    isLoading,
    loader,
    classname,
    icon,
    iconAltText,
    startIconStyle,
  } = props;
  return (
    <button
      className={classNames(
        styles.button_Container,
        disabled && styles.button_disabled,
        classname
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
      {isLoading && (
        <Loader customLoaderStyle={classNames(styles.loaderStyle, loader)} />
      )}

      {icon && (
        <Image
          image={icon}
          altText={iconAltText}
          customImageContainerStyle={classNames(
            styles.button_icon,
            startIconStyle
          )}
          customImageStyle={styles.button_iconFit}
        />
      )}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  loader: PropTypes.string,
  image: PropTypes.string,
  icon: PropTypes.string,
  iconAltText: PropTypes.string,
  iconStyle: PropTypes.string,
  classname: PropTypes.string,
  startIconStyle: PropTypes.string,
};

export { Button };
