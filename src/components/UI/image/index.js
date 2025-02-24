import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.css';
import { Loader } from '../loader';

const Image = (props) => {
  const {
    image,
    id,
    altText,
    onClick = () => {},
    customImageContainerStyle,
    customImageStyle,
    imageContainerInlineStyle,
    style,
    imageRef,
    originalImgRef,
    isLoading,
    onLoad = () => {},
  } = props;

  return (
    <div
      className={classNames(
        styles.imageContainerStyle,
        customImageContainerStyle
      )}
      style={imageContainerInlineStyle}
      onClick={onClick}
      ref={imageRef}
      id={id}
    >
      {/* {isLoading && <div className={styles.loader}>Loading...</div>} */}
      {isLoading && <Loader />}

      <img
        src={image}
        alt={altText}
        loading="lazy"
        className={classNames(styles.imageStyle, customImageStyle)}
        style={style}
        ref={originalImgRef}
        onLoad={onLoad}
      />
      {props.children}
    </div>
  );
};

Image.propTypes = {
  altText: propTypes.string,
  id: propTypes.string,
  onClick: propTypes.func,
  image: propTypes.string,
  customImageContainerStyle: propTypes.string,
  customImageStyle: propTypes.string,
  imageContainerInlineStyle: propTypes.object,
  style: propTypes.object,
  imageRef: propTypes.string,
  isLoading: propTypes.bool,
  onLoad: propTypes.func,
  originalImgRef: propTypes.ref,
  children: propTypes.node,
};

export { Image };
