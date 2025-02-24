import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Portal from 'components/UI/portal';
import * as PopperJS from '@popperjs/core';
import classNames from 'classnames';
import ResizeObserver from 'resize-observer-polyfill';
import ClickOutside from './click-outside';
import styles from './styles.module.css';

const PopOver = (props) => {
  const {
    reference,
    showOverlay,
    show,
    onClose,
    overlayStyle,
    containerStyle,
    placement,
    relativeWidth = false,
    offset = [],
    children,
  } = props;

  const [popperElement, setPopperElement] = useState();

  useEffect(() => {
    let modifiers = [];
    if (relativeWidth) {
      modifiers.push({
        name: 'widthRelative',
        enabled: true,
        fn: ({ state }) => {
          popperElement.style.width = `${reference.offsetWidth}px`;
          return state;
        },
        phase: 'beforeWrite',
        requires: ['computeStyles'],
      });
    }
    if (offset.length > 0) {
      modifiers.push({
        name: 'offset',
        options: {
          offset,
        },
      });
    }
    let popperInstance = PopperJS.createPopper(reference, popperElement, {
      placement: placement || 'bottom-start',
      modifiers,
    });

    const resizeObserver = new ResizeObserver(() => popperInstance.update());
    if (reference) {
      resizeObserver.observe(reference);
    }
    return () => {
      resizeObserver.disconnect();
      popperInstance.destroy();
    };
  }, [reference, popperElement, placement, relativeWidth]);

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'unset';
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <Portal>
      {showOverlay && (
        <div
          className={classNames(
            styles.overlayStyle,
            styles.overlayBgStyle,
            overlayStyle
          )}
        />
      )}
      <ClickOutside
        reference={[popperElement, reference]}
        onClickOutside={onClose}
      >
        <div
          className={classNames(styles.containerStyle, containerStyle)}
          onClick={(e) => e.stopPropagation()}
          ref={setPopperElement}
        >
          {children}
        </div>
      </ClickOutside>
    </Portal>
  );
};

PopOver.propTypes = {
  reference: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  show: PropTypes.bool.isRequired,
  showOverlay: PropTypes.bool,
  onClose: PropTypes.func,
  containerStyle: PropTypes.string,
  overlayStyle: PropTypes.string,
  placement: PropTypes.oneOf(PopperJS.placements),
  relativeWidth: PropTypes.bool,
  offset: PropTypes.arrayOf(PropTypes.number),
  children: PropTypes.node,
};

export default PopOver;
