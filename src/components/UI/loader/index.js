import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Loader = (props) => {
  const { customLoaderContainerStyle, customLoaderStyle } = props;
  return (
    <div
      className={classNames(
        styles.loaderContainerStyle,
        customLoaderContainerStyle
      )}
    >
      <div className={classNames(styles.loaderStyle, customLoaderStyle)}></div>
    </div>
  );
};

Loader.propTypes = {
  customLoaderContainerStyle: PropTypes.string,
  customLoaderStyle: PropTypes.string,
};

export { Loader };
