import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { downChevronBlackIcon } from 'resources/images';
import Calendar from 'components/calender';
import { Image } from 'components/UI/image';
import PopOver from 'components/UI/popover';
import styles from './styles.module.css';

const DatePicker = (props) => {
  const {
    placeholder = 'June 26',
    isOpen,
    onToggle,
    labelText,
    value,
    onChange = () => {},
    minDate,
    maxDate,
    disabled = false,
    icon,
    containerStyle,
    labelTextStyle,
    valueStyle,
    iconStyle,
  } = props;

  const [pickerRef, setPickerRef] = useState();
  const [position, setPosition] = useState('bottom');

  useEffect(() => {
    if (isOpen && pickerRef) {
      const rect = pickerRef.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const spaceRight = window.innerWidth - rect.right;
      const spaceLeft = rect.left;

      if (spaceBelow >= 300) {
        setPosition('bottom');
      } else if (spaceAbove >= 300) {
        setPosition('top');
      } else if (spaceRight >= 300) {
        setPosition('right');
      } else if (spaceLeft >= 300) {
        setPosition('left');
      } else {
        setPosition('bottom');
      }
    }
  }, [isOpen, pickerRef]);

  return (
    <div className={styles.wrapperStyle}>
      {labelText && (
        <p className={classNames(styles.labelTextStyle, labelTextStyle)}>
          {labelText}
        </p>
      )}
      <div
        className={classNames(
          styles.pikcerContainerStyle,
          disabled && styles.disabledStyle,
          containerStyle
        )}
        onClick={() => !disabled && onToggle(!isOpen)}
        ref={(ref) => setPickerRef(ref)}
      >
        <span
          className={classNames(
            styles.labelStyle,
            value ? styles.valueStyle : styles.placeHolderStyle,
            valueStyle
          )}
        >
          {value ? moment(value).format('MMMM D') : placeholder}
        </span>
        <Image
          image={icon ? icon : downChevronBlackIcon}
          customImageContainerStyle={classNames(
            isOpen ? styles.iconRotate : styles.iconWrapperStyle,
            iconStyle
          )}
          customImageStyle={styles.iconFit}
          imgStyle={isOpen && !icon ? styles.iconRotateStyle : ''}
        />
        <PopOver
          reference={pickerRef}
          show={isOpen}
          onClose={() => onToggle(false)}
          containerStyle={styles.datePickPopOverStyle}
          placement={position}
        >
          <Calendar
            value={value}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(date) => {
              onChange(date);
              onToggle(false);
            }}
          />
        </PopOver>
      </div>
    </div>
  );
};

DatePicker.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  labelText: PropTypes.string,
  labelTextStyle: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]),
  onChange: PropTypes.func,
  minDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]),
  maxDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]),
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  iconStyle: PropTypes.string,
  valueStyle: PropTypes.string,
  containerStyle: PropTypes.string,
  disabled: PropTypes.bool,
};

export default DatePicker;
