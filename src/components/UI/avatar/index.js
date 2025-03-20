import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.css';

const Avatar = (props) => {
  const {
    src,
    label,
    alt,
    containerStyle,
    imgStyle,
    onClick = () => {},
  } = props;

  const getCharAtName = (name) => name && name.charAt(0).toUpperCase();

  const getColorByName = (name) => {
    if (['A', 'N', 'H', 'L', 'Q'].includes(getCharAtName(name)))
      return styles.color1Style;
    if (['F', 'G', 'T', 'I', 'J'].includes(getCharAtName(name)))
      return styles.color2Style;
    if (['K', 'D', 'Y', 'B', 'O'].includes(getCharAtName(name)))
      return styles.color3Style;
    if (['P', 'E', 'R', 'S', 'U'].includes(getCharAtName(name)))
      return styles.color4Style;
    if (['V', 'W', 'X', 'M', 'Z'].includes(getCharAtName(name)))
      return styles.color5Style;
    return styles.color1Style;
  };

  return (
    <div
      className={classNames(
        styles.containerStyle,
        !src ? getColorByName(label) : '',
        containerStyle
      )}
      onClick={onClick}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={classNames(styles.imgStyle, imgStyle)}
        />
      ) : (
        label?.trim().split('')[0].toUpperCase()
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  label: PropTypes.string,
  alt: PropTypes.string,
  containerStyle: PropTypes.string,
  imgStyle: PropTypes.string,
  onClick: PropTypes.func,
};

export default Avatar;
