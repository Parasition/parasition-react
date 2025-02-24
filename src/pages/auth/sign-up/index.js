import React, { useState } from 'react';
import { Image } from 'components/UI/image';
import { parasitionLogo } from 'resources/images';
import Input from 'components/UI/input';
import { Button } from 'components/UI/button';
import { useNavigate } from 'react-router-dom';
import { Constants } from 'utils/constants';
import { emailValidationSchema } from 'utils/validations';
import TextArea from 'components/UI/text-area';
import styles from './styles.module.css';
import { useAuthContext } from 'hooks/useauthcontext';

const SignUp = () => {
  // ROUTING
  const navigate = useNavigate();

  // CONSTANTS
  const { routeNames } = Constants();

  // CONTEXTS
  const { userRegister, setAuthError, authError, showLoader, setShowLoader } =
    useAuthContext();

  // STATES

  const [formData, setFormData] = useState({
    name: '',
    business_name: '',
    address: '',
    phone_number: '',
    email: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState({
    name: '',
    business_name: '',
    address: '',
    phone_number: '',
    email: '',
    password: '',
  });

  // FUNCTION : tap on sign up button
  const tapOnSignUpBtn = () => {
    const newErrorMsg = {};

    if (formData.name === '') {
      newErrorMsg.name = 'Name is required';
    }
    if (formData.business_name === '') {
      newErrorMsg.business_name = 'Business name is required';
    }

    if (formData.address === '') {
      newErrorMsg.address = 'Address is required';
    }

    if (formData.phone_number === '') {
      newErrorMsg.phone_number = 'Phone Number is required';
    }
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
      handleSignUp();
    }
  };

  const handleSignUp = async () => {
    setShowLoader(true);
    await userRegister(formData);
    setShowLoader(false);
  };

  const renderLogo = () => {
    return (
      <div className={styles.signUp_topSection}>
        <Image
          image={parasitionLogo}
          altText="logo"
          customImageContainerStyle={styles.main_logo}
        />
        <p className={styles.parasitionText}>Parasition</p>
      </div>
    );
  };

  const renderInputsAndBtn = () => {
    return (
      <div className={styles.sigUp_bottomSection}>
        <div className={styles.desc_content}>
          <p className={styles.signUp_label}>Sign Up</p>
          <p className={styles.already_accountLabel}>
            Already have an account?
            <span onClick={() => navigate(routeNames.login)}> Log In</span>
          </p>
        </div>
        <div className={styles.inputs_section}>
          {renderNameAndBusinessName()}
          {renderAddressAndMobileNumber()}
          {renderEmailAndPassword()}
        </div>
        {authError && <p className={styles.signUp_authErrorMsg}>{authError}</p>}
        <Button
          title="Sign Up"
          onClick={() => tapOnSignUpBtn()}
          isLoading={showLoader}
        />
      </div>
    );
  };

  const renderNameAndBusinessName = () => {
    return (
      <div className={styles.inputs_Subsection}>
        <Input
          type="text"
          placeholder="Name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          onFocus={() => {
            setErrorMsg({ ...errorMsg, name: '' });
            setAuthError('');
          }}
          hasError={errorMsg.name}
          containerStyle={styles.name_input_container}
        />
        <Input
          type="text"
          placeholder="Business name"
          onChange={(e) =>
            setFormData({ ...formData, business_name: e.target.value })
          }
          onFocus={() => {
            setErrorMsg({ ...errorMsg, business_name: '' });
            setAuthError('');
          }}
          hasError={errorMsg.business_name}
          containerStyle={styles.name_input_container}
        />
      </div>
    );
  };

  const renderAddressAndMobileNumber = () => {
    return (
      <div className={styles.inputs_Subsection}>
        <Input
          type="email"
          placeholder="Email Adress"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onFocus={() => {
            setErrorMsg({ ...errorMsg, email: '' });
            setAuthError('');
          }}
          hasError={errorMsg.email}
          containerStyle={styles.email_input_container}
        />

        <Input
          type="number"
          placeholder="Mobile Number"
          onChange={(e) =>
            setFormData({ ...formData, phone_number: e.target.value })
          }
          onFocus={() => {
            setErrorMsg({ ...errorMsg, phone_number: '' });
            setAuthError('');
          }}
          hasError={errorMsg.phone_number}
          containerStyle={styles.number_input_container}
        />
      </div>
    );
  };

  const renderEmailAndPassword = () => {
    return (
      <div className={styles.passwordAndTextBox}>
        <Input
          type="password"
          placeholder="Create Password"
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

        <TextArea
          type="text"
          placeholder="Address"
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          onFocus={() => {
            setErrorMsg({ ...errorMsg, address: '' });
            setAuthError('');
          }}
          errorMsg={errorMsg.address}
          customErrorMsgStyle={styles.addressErrorMsg}
          textAreaInputStyle={styles.address_textArea}
        />
      </div>
    );
  };

  return (
    <div className={styles.signUp_container}>
      {renderLogo()}
      {renderInputsAndBtn()}
    </div>
  );
};

export default SignUp;
