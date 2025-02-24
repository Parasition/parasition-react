import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { leftArrowBlueIcon, rightArrowBlueIcon } from 'resources/images';
import { Image } from 'components/UI/image';
import styles from './styles.module.css';

const weeks = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const Calendar = (props) => {
  const { value = new Date(), onChange = () => {}, minDate, maxDate } = props;
  const [selectedDate, setSelectedDate] = useState(
    moment(value).isValid() ? value : new Date()
  );
  const [selectedMonthDates, setSelectedMonthDates] = useState(
    getDatesInMonth(value)
  );
  const [showMonths, setShowMonths] = useState(false);
  const [prevMonthDays, setPrevMonthDays] = useState(
    moment(value).startOf('month').get('day')
  );
  const [nextMonthDays, setNextMonthDays] = useState(
    6 - moment(value).endOf('month').get('day')
  );

  useEffect(() => {
    const startDateOMonth = new Date(moment(selectedDate).startOf('month'));
    const endDateOMonth = new Date(moment(selectedDate).endOf('month'));
    setSelectedMonthDates(getDatesInMonth(selectedDate));
    setPrevMonthDays(moment(startDateOMonth).get('day'));
    setNextMonthDays(6 - moment(endDateOMonth).get('day'));
  }, [selectedDate]);

  function getDatesInMonth(date) {
    const startDate = moment(date).startOf('month');
    const endDate = moment(startDate).endOf('month');
    const datesArray = [];
    let value = moment(startDate);
    while (value.isSameOrBefore(endDate)) {
      datesArray.push(new Date(moment(value)));
      value.add(1, 'day');
    }
    return datesArray;
  }

  const handleNextMonthClick = () => {
    setSelectedDate(new Date(moment(selectedDate).add(1, 'month')));
  };

  const handlePreviousMonthClick = () => {
    setSelectedDate(new Date(moment(selectedDate).subtract(1, 'month')));
  };

  const isDisabled = (date) => {
    return (
      (minDate &&
        moment(minDate).isValid() &&
        moment(date).isBefore(minDate, 'day')) ||
      (maxDate &&
        moment(minDate).isValid() &&
        moment(date).isAfter(maxDate, 'day'))
    );
  };

  const getDateWrapperStyles = (date) => {
    return classNames(
      styles.dateWrapperStyle,
      moment(new Date()).isSame(date, 'date') && styles.currentDateWrapperStyle,
      moment(value).isSame(date, 'date') && styles.selectedDateWrapperStyle,
      isDisabled(date) && styles.disabledDateWrapperStyle
    );
  };

  const getDateLabelStyles = (date) => {
    return classNames(
      styles.dateLabelStyle,
      moment(value).isSame(date, 'date') && styles.selectedDateLabelStyle
    );
  };

  return (
    <div className={styles.containerStyle}>
      <div className={styles.headerWarpperStyle}>
        <div className={styles.headerLeftWrapperStyle}>
          <div className={styles.headerContentStyle}>
            <p
              className={styles.headerTitleStyle}
              onClick={() => setShowMonths(true)}
            >
              {moment(selectedDate).format('MMMM')}
            </p>
            &nbsp;
            <p className={styles.headerTitleStyle}>
              {moment(selectedDate).format('YYYY')}
            </p>
          </div>
        </div>
        <div className={styles.headerRightWrapperStyle}>
          <Image
            image={leftArrowBlueIcon}
            customImageContainerStyle={styles.iconWrapperStyle}
            customImageStyle={styles.iconStyle}
            onClick={handlePreviousMonthClick}
          />

          <Image
            image={rightArrowBlueIcon}
            customImageContainerStyle={styles.iconWrapperStyle}
            customImageStyle={styles.iconStyle}
            onClick={handleNextMonthClick}
          />
        </div>
      </div>
      <div className={styles.weeksWrapperStyle}>
        {weeks.map((week) => (
          <p key={week} className={styles.weekTitleStyle}>
            {week}
          </p>
        ))}
      </div>
      <div className={styles.daysWrapperStyle}>
        {Array.from({ length: prevMonthDays }).map((_, index) => (
          <div key={index} className={styles.dateWrapperStyle}></div>
        ))}
        {selectedMonthDates.map((date, index) => (
          <div
            key={index}
            className={getDateWrapperStyles(date)}
            onClick={() => {
              if (!isDisabled(date)) {
                onChange(date);
                setSelectedDate(date);
              }
            }}
          >
            <p className={getDateLabelStyles(date)}>
              {moment(date).format('D')}
            </p>
          </div>
        ))}
        {Array.from({ length: nextMonthDays }).map((_, index) => (
          <div key={index} className={styles.dateWrapperStyle}></div>
        ))}
      </div>
      {showMonths && (
        <div className={classNames(styles.monthWrapperStyle)}>
          {months.map((month) => (
            <div
              key={month}
              className={styles.monthStyle}
              onClick={() => {
                setSelectedDate(moment(selectedDate).set('month', month));
                setShowMonths(false);
              }}
            >
              {month}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Calendar.propTypes = {
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
};

export default Calendar;
