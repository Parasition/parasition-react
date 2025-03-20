import { getUserDetailsApi, loginApi, registerApi } from 'networking/apis/user';
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { setAxiosSession } from 'services/auth';
import { getDataFromToken, isTokenExpired } from 'services/jwt';
import { Constants } from 'utils/constants';
import PropTypes from 'prop-types';

// AUTHENTICATION CONTEXT
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // CONSTANTS
  const { routeNames } = Constants();

  // ROUTING
  const navigate = useNavigate();

  // STATES
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  // FUNCTION: Logout
  const logOut = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userData');
    setAxiosSession(null);
    setIsLoggedIn(false);
    setUserData(null);
    setUserDetails(null);
  }, []);

  // FUNCTION: Initialize Authentication
  const initialize = useCallback(async () => {
    try {
      const loggedIn = JSON.parse(localStorage.getItem('loggedIn')) || false;
      const token = localStorage.getItem('accessToken');
      if (loggedIn && token && isTokenExpired(token)) {
        setAxiosSession(token);
        const tokenData = await getDataFromToken(token);
        try {
          let userResponse = await getUserDetailsApi(tokenData?.id);
          setUserData(userResponse.data.data);
          setIsLoggedIn(true);
        } catch (error) {
          console.log('error', error);
        }
      } else {
        logOut();
      }

      setIsInitialized(true);
    } catch (error) {
      setIsInitialized(true);
      setIsLoggedIn(false);
      setAuthError(error.message);
    }
  }, [logOut]);

  // FUNCTION : User Register

  const userRegister = useCallback(
    async (registerData) => {
      setShowLoader(true);
      try {
        await registerApi(registerData);
        setShowLoader(false);
        navigate(routeNames.login);
      } catch (error) {
        setShowLoader(false);
        setAuthError(error.message);
      }
    },
    [navigate, routeNames.login]
  );

  // FUNCTION: User Login
  const userLogin = useCallback(
    async (loginData) => {
      setShowLoader(true);
      try {
        const response = await loginApi(loginData);
        const { data, token } = response.data;
        console.log('3456789,', data);
        setAxiosSession(token);
        localStorage.setItem('accessToken', token);
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('userData', JSON.stringify(data));
        setUserData(data);
        setIsLoggedIn(true);
        setShowLoader(false);
        navigate(routeNames.createCampaign);
      } catch (error) {
        setShowLoader(false);
        setAuthError(error.message);
      }
    },
    [navigate, routeNames.createCampaign]
  );

  // EFFECT: Initialize Authentication on Component Mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (localStorage.getItem('userData')) {
      setUserDetails(JSON.parse(localStorage.getItem('userData')));
    }
  }, [isLoggedIn]);

  // Memoized Context Value
  const memoizedValue = useMemo(
    () => ({
      // VALUES
      isInitialized,
      isLoggedIn,
      userData,
      authError,
      showLoader,
      userDetails,

      // FUNCTIONS
      setIsInitialized,
      setIsLoggedIn,
      setUserData,
      setAuthError,
      setShowLoader,
      logOut,
      userLogin,
      setUserDetails,
      userRegister,
    }),
    [
      isInitialized,
      isLoggedIn,
      userData,
      authError,
      showLoader,
      logOut,
      userLogin,
      userDetails,
      setUserDetails,
      userRegister,
    ]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthContext, AuthProvider };
