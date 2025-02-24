import React from 'react';
import { Image } from 'components/UI/image';
import { plusGrayIcon } from 'resources/images';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

function AddNewFile(props) {
  // PROPS

  const { onPressPlusIcon, addNewFileContainerStyle, addNewPlusIconStyle } =
    props;

  return (
    <div
      className={classNames(
        styles.addNewFile_container,
        addNewFileContainerStyle
      )}
    >
      <Image
        image={plusGrayIcon}
        altText="plusGrayIcon"
        onClick={onPressPlusIcon}
        customImageContainerStyle={classNames(
          styles.addNewFile_plusGrayIcon,
          addNewPlusIconStyle
        )}
      />
    </div>
  );
}

AddNewFile.propTypes = {
  onPressPlusIcon: PropTypes.func,
  addNewFileContainerStyle: PropTypes.string,
  addNewPlusIconStyle: PropTypes.string,
};

export { AddNewFile };
