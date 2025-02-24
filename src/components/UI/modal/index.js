import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Portal from '../portal';
import styles from './styles.module.css';

const Modal = (props) => {
  const {
    show,
    onClose,
    closeOnOutSideClick,
    handleClickOutSide,
    children,
    showOverlay,
    overlayStyle,
    containerStyle,
  } = props;

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = ''; // Cleanup on unmount
    };
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <Portal>
      {showOverlay && (
        <div
          className={classNames(styles.overlayStyle, overlayStyle)}
          tabIndex={0}
          role="button"
          onClick={
            handleClickOutSide
              ? handleClickOutSide
              : closeOnOutSideClick && onClose
          }
        />
      )}
      <div
        className={classNames(styles.containerStyle, containerStyle)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </Portal>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  showOverlay: PropTypes.bool,
  onClose: PropTypes.func,
  closeOnOutSideClick: PropTypes.bool,
  handleClickOutSide: PropTypes.func,
  containerStyle: PropTypes.string,
  overlayStyle: PropTypes.string,
};

export default Modal;
