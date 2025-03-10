import React from 'react';
import { Image } from 'components/UI/image';
import { logoutIcon, parasitionLogo, warnerSwedenIcon } from 'resources/images';
import { Constants } from 'utils/constants';
import { Button } from 'components/UI/button';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const Header = () => {
  // CONSTANTS

  const { routeNames, menuData } = Constants();

  // ROUTING
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userData');
    navigate(routeNames.login);
  };

  const renderLogoAndMenu = () => {
    return (
      <div className={styles.logo_menu_section}>
        <Image
          image={parasitionLogo}
          altText="parasitionLogo"
          onClick={() => navigate(routeNames.createCampaign)}
          customImageContainerStyle={styles.header_logo}
        />
        <div className={styles.header_menuContainer}>
          {menuData?.map((menuItem, index) => (
            <h5
              key={index}
              className={
                location.pathname === menuItem.route
                  ? styles.header_activeMenuItem
                  : styles.header_inActiveMenuItem
              }
              onClick={() => navigate(menuItem?.route)}
            >
              {menuItem?.name}
            </h5>
          ))}
        </div>
      </div>
    );
  };

  const renderWarnerSwedenBtn = () => {
    return (
      <Button
        title="Warner Sweden "
        onClick={() => {}}
        classname={styles.header_warnerSwedenBtn}
        icon={warnerSwedenIcon}
        iconAltText="Warner Sweden "
      />
    );
  };

  const renderLogutBtn = () => {
    return (
      <Button
        onClick={() => handleLogout()}
        classname={styles.header_logoutBtn}
        icon={logoutIcon}
        iconAltText="logout"
      />
    );
  };

  return (
    <header className={styles.header_container}>
      {renderLogoAndMenu()}
      <div className={styles.header_subContainer}>
        {renderWarnerSwedenBtn()}
        {renderLogutBtn()}
      </div>
    </header>
  );
};

export { Header };
