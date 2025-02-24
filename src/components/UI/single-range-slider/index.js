import React from 'react';
import { Range, getTrackBackground } from 'react-range';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const SingleRangeSlider = (props) => {
  // PROPS
  const { min, max, value, onChange } = props;

  return (
    <div className={styles.rangeContainer}>
      <Range
        step={1}
        min={min}
        max={max}
        values={value}
        onChange={onChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '4px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '3px',
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '100%',
                width: '100%',
                background: getTrackBackground({
                  values: value,
                  colors: ['rgba(18, 121, 255, 1)', 'rgba(255, 207, 200, 1)'],
                  min: min,
                  max: max,
                }),
                borderRadius: '10px',
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className={styles.thumb}
            style={{
              ...props.style,
              height: '20px',
              width: '20px',
              borderRadius: '50%',
              backgroundColor: '#fff',
              border: '2.5px solid rgba(221, 221, 221, 1)',
              cursor: 'grab',
            }}
          />
        )}
      />
    </div>
  );
};

SingleRangeSlider.propTypes = {
  min: PropTypes.string,
  max: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.string,
  onMouseDown: PropTypes.string,
  onTouchStart: PropTypes.string,
  style: PropTypes.object,
  ref: PropTypes.ref,
};

export { SingleRangeSlider };
