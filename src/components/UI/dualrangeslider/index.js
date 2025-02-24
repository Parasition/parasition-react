import React from 'react';
import { Range, getTrackBackground } from 'react-range';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const DualRangeSlider = (props) => {
  // PROPS
  const { min, max, values, onChange } = props;

  return (
    <div className={styles.rangeContainer}>
      <label className={styles.leftLabel}>{values[0]}</label>

      <Range
        step={1}
        min={min}
        max={max}
        values={values}
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
              borderRadius: '10px',
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '100%',
                width: '100%',
                background: getTrackBackground({
                  values,
                  colors: ['#ccc', 'black', '#ccc'],
                  min: min,
                  max: max,
                }),
                borderRadius: '3px',
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
              height: '16px',
              width: '16px',
              borderRadius: '50%',
              backgroundColor: '#fff',
              border: '2.5px solid rgba(221, 221, 221, 1)',
              cursor: 'grab',
            }}
          />
        )}
      />

      <label className={styles.rightLabel}>
        {values[1] === min ? '65+' : values[1]}
      </label>
    </div>
  );
};

DualRangeSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  values: PropTypes.number,
  onChange: PropTypes.func,
  onMouseDown: PropTypes.func,
  onTouchStart: PropTypes.func,
  style: PropTypes.object,
  ref: PropTypes.ref,
};

export { DualRangeSlider };
