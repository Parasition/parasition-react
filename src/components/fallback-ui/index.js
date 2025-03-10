import React from 'react';
import { Image } from 'components/UI/image';
import { loveIcon } from 'resources/images';
import styles from './styles.module.css';

const FallbacUi = () => {
  return (
    <div className={styles.fallback_container}>
      <Image
        image={loveIcon}
        altText="love"
        customImageContainerStyle={styles.fallback_iconWrapper}
        customImageStyle={styles.fallback_icon}
      />
    </div>
  );
};

export default FallbacUi;
