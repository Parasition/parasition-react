import React, { useState } from 'react';
import { Image } from 'components/UI/image';
import { parasitionLogo } from 'resources/images';
import Input from 'components/UI/input';
import { Button } from 'components/UI/button';
import { useNavigate } from 'react-router-dom';
import { Constants } from 'utils/constants';
import { emailValidationSchema } from 'utils/validations';
import { useAuthContext } from 'hooks/useauthcontext';
import styles from './styles.module.css';

const Login = () => {
  // ROUTING
  const navigate = useNavigate();

  // CONSTANTS
  const { routeNames } = Constants();

  // CONTEXTS
  const { userLogin, setAuthError, authError, showLoader, setShowLoader } =
    useAuthContext();

  // STATES

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState({
    email: '',
    password: '',
  });

  // FUNCTION: onclick login button

  const tapOnLoginBtn = () => {
    const newErrorMsg = {};
    if (formData.email === '') {
      newErrorMsg.email = 'Email is required';
    } else if (!emailValidationSchema.test(formData.email)) {
      newErrorMsg.email = 'Invalid email format';
    }
    if (formData.password === '') {
      newErrorMsg.password = 'Password is required';
    }
    setErrorMsg(newErrorMsg);
    if (Object.keys(newErrorMsg).length === 0) {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    setShowLoader(true);
    await userLogin(formData);
    setShowLoader(false);
  };

  const renderLogo = () => {
    return (
      <div className={styles.login_topSection}>
        <Image
          image={parasitionLogo}
          altText="logo"
          customImageContainerStyle={styles.main_logo}
        />
        <p className={styles.parasitionText}>Parasition.love</p>
      </div>
    );
  };

  const renderInputsAndBtn = () => {
    return (
      <div className={styles.login_bottomSection}>
        <div className={styles.desc_content}>
          <p className={styles.login_label}>Log In</p>
          <p className={styles.dontHaveAccountLabel}>
            Don't have an account? &nbsp;
            <span onClick={() => navigate(routeNames.signUp)}>Sign Up</span>
          </p>
        </div>
        <div className={styles.inputs_section}>
          <Input
            type="email"
            placeholder="Email Adress"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            onFocus={() => {
              setErrorMsg({ ...errorMsg, email: '' });
              setAuthError('');
            }}
            hasError={errorMsg.email}
            containerStyle={styles.email_input_container}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            onFocus={() => {
              setErrorMsg({ ...errorMsg, password: '' });
              setAuthError('');
            }}
            hasError={errorMsg.password}
            containerStyle={styles.password_input_container}
          />
        </div>
        <Button
          title="LogIn"
          onClick={() => tapOnLoginBtn()}
          isLoading={showLoader}
        />

        {authError && <p className={styles.login_authErrorMsg}>{authError}</p>}

        <p className={styles.forgot_passwordText}>Forgot password?</p>
      </div>
    );
  };

  return (
    <div className={styles.login_container}>
      {renderLogo()}
      {renderInputsAndBtn()}
    </div>
  );
};

export default Login;
