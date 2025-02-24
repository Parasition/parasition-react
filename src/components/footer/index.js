import React from 'react';
import { Image } from 'components/UI/image';
import {
  privacyPolicyWhiteIcon,
  termsAndConditionsWhiteIcon,
} from 'resources/images';
import { Constants } from 'utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const Footer = () => {
  // CONSTANTS

  const { routeNames } = Constants();

  // ROUTING

  const navigate = useNavigate();

  const location = useLocation();

  return (
    <div className={styles.footer_container}>
      <h1 className={styles.footer_title}>Parasition.love</h1>

      <div className={styles.footer_menu}>
        <div
          className={
            location.pathname === routeNames.termsAndConditions
              ? styles.footer_activeMenuItem
              : styles.footer_menuItem
          }
          onClick={() => navigate(routeNames.termsAndConditions)}
        >
          <Image
            image={termsAndConditionsWhiteIcon}
            altText="termsAndConditions"
          />
          <label className={styles.footer_menuLabel}>Terms & Conditions</label>
        </div>
        <div
          className={
            location.pathname === routeNames.privacyPolicy
              ? styles.footer_activeMenuItem
              : styles.footer_menuItem
          }
          onClick={() => navigate(routeNames.privacyPolicy)}
        >
          <Image image={privacyPolicyWhiteIcon} altText="termsAndConditions" />
          <label className={styles.footer_menuLabel}>Privacy Policy</label>
        </div>
      </div>
    </div>
  );
};

export default Footer;
