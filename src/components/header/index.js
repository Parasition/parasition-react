import React from 'react';
import { Image } from 'components/UI/image';
import { logoutIcon, parasitionLogo, warnerSwedenIcon } from 'resources/images';
import { Constants } from 'utils/constants';
import { Button } from 'components/UI/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from 'hooks/useauthcontext';
import styles from './styles.module.css';
import Avatar from 'components/UI/avatar';

const Header = () => {
  // CONSTANTS

  const { routeNames, menuData } = Constants();
  const { userData } = useAuthContext();

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

  const renderUserSection = () => {
    return (
      <div className={styles.header_userDetailsWrapper}>
        <Avatar
          src={userData?.company_logo}
          label={userData?.name}
          alt={userData?.name}
        />
        <p className={styles.header_userTitle}>{userData?.name}</p>
      </div>
      // <Button
      //   title="Warner Sweden"
      //   onClick={() => {}}
      //   classname={styles.header_warnerSwedenBtn}
      //   icon={userData?.company_logo || warnerSwedenIcon}
      //   iconAltText="Warner Sweden "
      // />
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
        {renderUserSection()}
        {renderLogutBtn()}
      </div>
    </header>
  );
};

export { Header };
