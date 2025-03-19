import React from 'react';
import { loveIcon } from 'resources/images';
import styles from './styles.module.css';

const FallbacUi = () => {
  return (
    <div className={styles.container}>
      <img src={loveIcon} alt="Loading..." className={styles.image} />
      <div className={styles.loader}></div>
    </div>
  );
};

export default FallbacUi;
