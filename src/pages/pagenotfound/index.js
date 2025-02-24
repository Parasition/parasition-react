import React from 'react';
import { Image } from 'components/UI/image';
import { pageNotFoundImg } from 'resources/images';
import { Button } from 'components/UI/button';
import { Constants } from 'utils/constants';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const PageNotFound = () => {
  // CONSTANTS
  const { routeNames } = Constants();

  // ROUTING
  const navigate = useNavigate();

  return (
    <div className={styles.pageNotFound_container}>
      <Image
        image={pageNotFoundImg}
        altText=""
        customImageContainerStyle={styles.pageNotFound_image}
      />
      <Button
        title="Back To Home"
        onClick={() => navigate(routeNames.createCampaign)}
        classname={styles.pageNotFound_btn}
      />
    </div>
  );
};

export default PageNotFound;
