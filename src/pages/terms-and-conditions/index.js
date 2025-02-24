import React, { useEffect } from 'react';
import { Constants } from 'utils/constants';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const TermsAndConditions = () => {
  // CONSTANTS

  const { routeNames } = Constants();

  // ROUTING

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderOverView = () => {
    return (
      <div className={styles.termsAndConditions_overView}>
        <h1 className={styles.termsAndConditions_title}>Terms of Service</h1>
        <h5 className={styles.termsAndConditions_lastUpdated}>
          <span> Last Updated:</span> [14/01/2025]
        </h5>
        <p className={styles.termsAndConditions_description}>
          Welcome to <b>Parasition.love</b> (the “Platform”), operated by &nbsp;
          <b>Parasition AB</b> (“we,” “us,” “our”). These Terms of Service (the
          “Terms”) govern your access to and use of our Platform, which enables
          advertisers (“Customers”) to create and manage advertising campaigns
          via creators at scale (the “Services”). By accessing or using our
          Platform, you agree to be bound by these Terms and all applicable laws
          and regulations. If you do not agree with any part of these Terms, you
          must not use our Platform.
        </p>
      </div>
    );
  };

  const renderScopeAndEligibility = () => {
    return (
      <div className={styles.termsAndConditions_keyPoints}>
        <div className={styles.termsAndConditions_keyPointBox}>
          <h3 className={styles.termsAndConditions_keyPointTitle}>
            1. Scope & Eligibility
          </h3>

          <div className={styles.termsAndConditions_subClauseBox}>
            <div className={styles.termsAndConditions_subClause}>
              <h5 className={styles.termsAndConditions_subClauseTitle}>
                1.1 Business Use Only
              </h5>
              <p className={styles.termsAndConditions_subClauseDesc}>
                Our Platform is intended solely for business use by companies
                and their authorized representatives. By accessing or using the
                Platform, you represent that you are acting on behalf of a legal
                entity (e.g., company, organization) and have the authority to
                bind that entity to these Terms.
              </p>
            </div>

            <div className={styles.termsAndConditions_subClause}>
              <h5 className={styles.termsAndConditions_subClauseTitle}>
                1.2 No Minors
              </h5>
              <p className={styles.termsAndConditions_subClauseDesc}>
                Our Services are not intended for personal or non-business use
                by individuals under the age of 18. By using our Platform, you
                affirm that you are at least 18 years old and have the legal
                capacity to enter into a binding contract under the laws of
                Sweden.
              </p>
            </div>

            <div className={styles.termsAndConditions_subClause}>
              <h5 className={styles.termsAndConditions_subClauseTitle}>
                1.3 Location & Governing Law
              </h5>
              <p className={styles.termsAndConditions_subClauseDesc}>
                Our business is based in Sweden. These Terms shall be governed
                by and construed in accordance with the laws of Sweden, without
                regard to conflict of laws principles. You agree to submit to
                the exclusive jurisdiction of the Swedish courts in the event of
                any dispute arising out of or relating to these Terms or the
                Platform
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderModificationToTheTerms = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBox}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          2. Modifications to the Terms
        </h5>
        <p className={styles.termsAndConditions_subClauseDesc}>
          We reserve the right to modify or replace these Terms at any time. The
          date of the latest revision will be indicated at the top of this
          document. We will make reasonable efforts to notify you of any
          significant changes (e.g., by email or a notice on the Platform). Your
          continued use of the Platform after any such changes constitutes your
          acceptance of the revised Terms. If you do not agree to the revised
          Terms, you must stop using the Platform.
        </p>
      </div>
    );
  };

  const renderDescriptionOfServices = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBox}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          3. Description of Services
        </h5>
        <div className={styles.termsAndConditions_subClauseLevelTwo}>
          <h6 className={styles.termsAndConditions_subClauseTitle}>
            3.1 Advertising Campaign Management
          </h6>
          <p className={styles.termsAndConditions_subClauseDesc}>
            Parasition.love provides tools that enable Customers to create and
            manage advertising campaigns (“Campaigns”) through various creators
            or influencers. Our Services may include:
          </p>
          <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
            <li>Creation and setup of Campaign briefs</li>
            <li>Management of participating creators</li>
            <li>Data analytics and reporting (as applicable)</li>
          </ul>
        </div>

        <div className={styles.termsAndConditions_subClauseLevelTwo}>
          <h6 className={styles.termsAndConditions_subClauseTitle}>
            3.2 Future Services
          </h6>
          <p className={styles.termsAndConditions_subClauseDesc}>
            We may introduce recurring subscription-based features or other paid
            offerings in the future. These will be subject to additional terms
            or agreements, which will be presented to you at the time those
            services become available.
          </p>
        </div>
      </div>
    );
  };

  const renderUserAccounts = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBox}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          4. User Accounts
        </h5>
        <div className={styles.termsAndConditions_subClauseLevelTwo}>
          <h6 className={styles.termsAndConditions_subClauseTitle}>
            4.1 Registration
          </h6>
          <p className={styles.termsAndConditions_subClauseDesc}>
            To access certain features of the Platform, you may need to create
            an account (“Account”). When creating an Account, you agree to
            provide accurate, current, and complete information about yourself
            and/or your company, including but not limited to:
          </p>
          <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
            <li>Full name and/or company name</li>
            <li>Valid email address</li>
            <li>Phone number</li>
            <li>Company information</li>
          </ul>
        </div>

        <div className={styles.termsAndConditions_subClauseLevelTwo}>
          <h6 className={styles.termsAndConditions_subClauseTitle}>
            4.2 Account Security
          </h6>
          <p className={styles.termsAndConditions_subClauseDesc}>
            You are responsible for maintaining the confidentiality of your
            Account credentials and for all activities that occur under your
            Account. If you suspect any unauthorized use of your Account, notify
            us immediately at <b>admin@parasition.com.</b>
          </p>
        </div>

        <div className={styles.termsAndConditions_subClauseLevelTwo}>
          <h6 className={styles.termsAndConditions_subClauseTitle}>
            4.3 Account Termination
          </h6>
          <p className={styles.termsAndConditions_subClauseDesc}>
            We reserve the right to suspend or terminate your Account at any
            time for any reason, including but not limited to a breach of these
            Terms or violations of applicable law.
          </p>
        </div>
      </div>
    );
  };

  const renderAcceptableUseAndUserConduct = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBox}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          5. Acceptable Use & User Conduct
        </h5>
        <div className={styles.termsAndConditions_subClauseLevelTwo}>
          <h6 className={styles.termsAndConditions_subClauseTitle}>
            5.1 Prohibited Activities
          </h6>
          <p className={styles.termsAndConditions_subClauseDesc}>
            You agree not to use the Platform in any manner that:
          </p>
          <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
            <li>Violates any applicable law or regulation;</li>
            <li>
              Infringes on the intellectual property or privacy rights of
              others;
            </li>
            <li>
              Is offensive, defamatory, obscene, or otherwise inappropriate;
            </li>
            <li>
              Constitutes unauthorized or unsolicited advertising, spam, or any
              form of solicitation;
            </li>
            <li>
              Facilitates hacking, phishing, or other malicious activities;
            </li>
            <li>Interferes with the security or integrity of the Platform.</li>
          </ul>
        </div>

        <div className={styles.termsAndConditions_subClauseLevelTwo}>
          <h6 className={styles.termsAndConditions_subClauseTitle}>
            5.2 No Offensive Content
          </h6>
          <p className={styles.termsAndConditions_subClauseDesc}>
            While our Platform primarily facilitates the creation and management
            of advertising campaigns, if you or your company contribute any
            text, images, or other media (e.g., in briefs or instructions to
            creators), you must ensure that such content does not include any
            offensive, harassing, threatening, or otherwise unlawful material.
          </p>
        </div>
      </div>
    );
  };

  const renderIntellectualProperty = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBox}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          6. Intellectual Property
        </h5>

        <div className={styles.termsAndConditions_subClauseLevelTwo}>
          <h6 className={styles.termsAndConditions_subClauseTitle}>
            6.1 Ownership
          </h6>
          <p className={styles.termsAndConditions_subClauseDesc}>
            All content available on or through the Platform—including text,
            graphics, logos, icons, images, audio clips, video clips, digital
            downloads, data compilations, and software—is the property of
            Parasition AB or its content suppliers and is protected by
            international copyright, trademark, and other intellectual property
            laws.
          </p>
        </div>

        <div className={styles.termsAndConditions_subClauseLevelTwo}>
          <h6 className={styles.termsAndConditions_subClauseTitle}>
            6.2 License to Use the Platform
          </h6>
          <p className={styles.termsAndConditions_subClauseDesc}>
            We grant you a limited, non-exclusive, non-transferable, revocable
            license to access and use the Platform solely for your internal
            business purposes in accordance with these Terms.
          </p>
        </div>

        <div className={styles.termsAndConditions_subClauseLevelTwo}>
          <h6 className={styles.termsAndConditions_subClauseTitle}>
            6.3 User-Generated Content
          </h6>
          <p className={styles.termsAndConditions_subClauseDesc}>
            If you or your company create or upload any content (such as
            advertising briefs, images, or other materials) on the Platform
            (“User Content”):
          </p>
          <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
            <li>
              You warrant that you have all necessary rights, licenses, and
              permissions to post or upload the User Content.
            </li>
            <li>
              You grant Parasition AB a worldwide, royalty-free, non-exclusive
              license to use, reproduce, modify, and display the User Content
              solely for the purpose of operating the Platform and providing our
              Services.
            </li>
            <li>
              You retain any intellectual property rights you hold in the User
              Content; however, you acknowledge that the brief(s) or campaigns
              created on the Platform may be accessible to creators or other
              authorized users as necessary to fulfill the scope of the
              Services.
            </li>
          </ul>
        </div>

        <div className={styles.termsAndConditions_subClauseLevelTwo}>
          <h6 className={styles.termsAndConditions_subClauseTitle}>
            6.4 Trademarks and Logos
          </h6>
          <p className={styles.termsAndConditions_subClauseDesc}>
            All logos, trademarks, service marks, and trade names (collectively,
            the “Marks”) displayed on the Platform belong to Parasition AB or
            other respective owners. You may not use or display any Marks
            without the prior written consent of the applicable rights holder.
          </p>
        </div>
      </div>
    );
  };

  const renderPayments = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBox}>
        <h3 className={styles.termsAndConditions_keyPointTitle}>7. Payments</h3>

        <div className={styles.termsAndConditions_subClauseBox}>
          <div className={styles.termsAndConditions_subClause}>
            <h5 className={styles.termsAndConditions_subClauseTitle}>
              7.1 Payment Methods
            </h5>
            <p className={styles.termsAndConditions_subClauseDesc}>
              We currently accept payments through Stripe and by invoicing. By
              providing a payment method, you represent and warrant that you are
              authorized to use the designated payment method and authorize us
              (or our third-party payment processor) to charge the payment
              method for the total amount of your purchase (including any
              applicable taxes and fees).
            </p>
          </div>

          <div className={styles.termsAndConditions_subClause}>
            <h5 className={styles.termsAndConditions_subClauseTitle}>
              7.2 Refunds & Cancellations
            </h5>
            <p className={styles.termsAndConditions_subClauseDesc}>
              We do not currently offer a standard subscription model. If you
              believe you are entitled to a refund for any reason, please
              contact us at <b>admin@parasition.com</b> so we can review your
              situation on a case-by-case basis.
            </p>
          </div>

          <div className={styles.termsAndConditions_subClause}>
            <h5 className={styles.termsAndConditions_subClauseTitle}>
              7.3 Future Subscription Terms
            </h5>
            <p className={styles.termsAndConditions_subClauseDesc}>
              If we introduce recurring subscription plans, we will provide
              additional terms that will apply to those subscriptions, including
              billing cycles, cancellation policies, and more. You will have the
              opportunity to review and accept those terms before any
              subscription fees apply.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderPrivacyAndDataProtection = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBox}>
        <h3 className={styles.termsAndConditions_keyPointTitle}>
          8. Privacy & Data Protection
        </h3>

        <div className={styles.termsAndConditions_subClauseBox}>
          <div className={styles.termsAndConditions_subClause}>
            <h5 className={styles.termsAndConditions_subClauseTitle}>
              8.1 Privacy Policy
            </h5>
            <p className={styles.termsAndConditions_subClauseDesc}>
              Your use of the Platform is also governed by our Privacy Policy,
              which is incorporated by reference into these Terms. Please review
              our{' '}
              <span
                className={styles.termsAndConditions_privacyPolicyText}
                onClick={() => navigate(routeNames.privacyPolicy)}
              >
                Privacy Policy
              </span>{' '}
              for information about how we collect, use, and disclose personal
              data.
            </p>
          </div>

          <div className={styles.termsAndConditions_subClause}>
            <h5 className={styles.termsAndConditions_subClauseTitle}>
              8.2 Personal Data Collected
            </h5>
            <p className={styles.termsAndConditions_subClauseDesc}>
              We may collect and process personal data including names, email
              addresses, phone numbers, and company information. We do not
              currently use cookies or other tracking mechanisms on our
              Platform. If we begin using cookies or implement new tracking
              features, we will update our Privacy Policy and provide notice
              where required by law.
            </p>
          </div>

          <div className={styles.termsAndConditions_subClause}>
            <h5 className={styles.termsAndConditions_subClauseTitle}>
              8.3 GDPR & CCPA Compliance
            </h5>
            <p className={styles.termsAndConditions_subClauseDesc}>
              To the extent we process personal data of individuals located in
              the European Union or California, we will comply with the General
              Data Protection Regulation (GDPR) and the California Consumer
              Privacy Act (CCPA), respectively.
            </p>
          </div>

          <div className={styles.termsAndConditions_subClause}>
            <h5 className={styles.termsAndConditions_subClauseTitle}>
              8.4 Data Security
            </h5>
            <p className={styles.termsAndConditions_subClauseDesc}>
              We employ commercially reasonable security measures to protect
              personal data. However, no system is 100% secure, and we cannot
              guarantee the absolute security of your information.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderDisclaimers = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBox}>
        <h3 className={styles.termsAndConditions_keyPointTitle}>
          9. Disclaimers
        </h3>

        <div className={styles.termsAndConditions_subClauseBox}>
          <div className={styles.termsAndConditions_subClause}>
            <h5 className={styles.termsAndConditions_subClauseTitle}>
              9.1 As-Is Basis
            </h5>
            <p className={styles.termsAndConditions_subClauseDesc}>
              Our Platform and Services are provided on an “as is” and “as
              available” basis. To the fullest extent permitted by applicable
              law, Parasition AB disclaims all warranties and representations,
              whether express, implied, or statutory, including but not limited
              to implied warranties of merchantability, fitness for a particular
              purpose, and non-infringement.
            </p>
          </div>

          <div className={styles.termsAndConditions_subClause}>
            <h5 className={styles.termsAndConditions_subClauseTitle}>
              9.2 Availability & Accuracy
            </h5>
            <p className={styles.termsAndConditions_subClauseDesc}>
              While we strive to ensure the Platform is always available and
              accurate, we make no guarantee that the Platform will be
              uninterrupted, secure, error-free, or free of viruses or other
              harmful components.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderLimitationAndLiability = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBox}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          10. Limitation of Liability
        </h5>
        <p className={styles.termsAndConditions_subClauseDesc}>
          To the extent permitted by applicable law, you agree that Parasition
          AB, its employees, officers, directors, affiliates, and agents shall
          not be liable for any indirect, incidental, special, or consequential
          damages arising out of or in connection with your use of (or inability
          to use) the Platform or the Services. This includes, but is not
          limited to, damages for loss of profits, goodwill, or other intangible
          losses, even if we have been advised of the possibility of such
          damages.
        </p>
      </div>
    );
  };

  const renderIndemnification = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBox}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          11. Indemnification
        </h5>
        <div className={styles.termsAndConditions_subClauseLevelTwo}>
          <p className={styles.termsAndConditions_subClauseDesc}>
            You agree to indemnify, defend, and hold harmless Parasition AB, its
            officers, directors, employees, and agents from and against any and
            all claims, damages, obligations, losses, liabilities, costs, or
            debt, and expenses (including but not limited to attorneys’ fees)
            arising from:
          </p>
          <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
            <li>Your use of and access to the Platform;</li>
            <li>Your breach of any part of these Terms;</li>
            <li>
              Your violation of any law or regulation or the rights of a third
              party;
            </li>
            <li>
              Any claim that User Content provided by you caused damage to a
              third party.
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const renderTermination = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBox}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          12. Termination
        </h5>
        <p className={styles.termsAndConditions_subClauseDesc}>
          We reserve the right to terminate or suspend your access to the
          Platform immediately, without prior notice or liability, for any
          reason, including breach of these Terms. Upon termination, your right
          to use the Platform will cease immediately. If you wish to terminate
          your Account, you may simply discontinue using the Platform or contact
          us at <b>admin@parasition.com.</b>
        </p>
      </div>
    );
  };

  const renderSeverability = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBox}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          13. Severability
        </h5>
        <p className={styles.termsAndConditions_subClauseDesc}>
          If any provision of these Terms is held to be invalid or unenforceable
          by a court of competent jurisdiction, then the remaining provisions of
          these Terms will remain in full force and effect.
        </p>
      </div>
    );
  };

  const renderEntireAgreement = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBox}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          14. Entire Agreement
        </h5>
        <p className={styles.termsAndConditions_subClauseDesc}>
          These Terms, together with our Privacy Policy and any additional terms
          you agree to when using particular elements of the Platform,
          constitute the entire agreement between you and Parasition AB
          regarding the Platform and Services, and supersede all prior
          agreements, understandings, or communications, whether written or
          oral.
        </p>
      </div>
    );
  };

  const renderContactUs = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBox}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          15. Contact Us
        </h5>
        <p className={styles.termsAndConditions_subClauseDesc}>
          For questions about these Terms, the Platform, or the Services, please
        </p>
        <p className={styles.termsAndConditions_subClauseDesc}>
          <b>Email:</b> admin@parasition.com
        </p>
      </div>
    );
  };

  const renderLastWords = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBoxWithLastWords}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>Last Words</h5>
        <p className={styles.termsAndConditions_subClauseDesc}>
          Thank you for choosing <b>Parasition.love</b> to create and manage
          your advertising campaigns. By using our Platform, you agree to these
          Terms of Service. Make sure to review them periodically, as we may
          update them from time to time. If you have any questions or concerns,
          don’t hesitate to reach out at <b>admin@parasition.com.</b>
        </p>
      </div>
    );
  };

  return (
    <div className={styles.termsAndConditions_container}>
      {renderOverView()}
      {renderScopeAndEligibility()}
      {renderModificationToTheTerms()}
      {renderDescriptionOfServices()}
      {renderUserAccounts()}
      {renderAcceptableUseAndUserConduct()}
      {renderIntellectualProperty()}
      {renderPayments()}
      {renderPrivacyAndDataProtection()}
      {renderDisclaimers()}
      {renderLimitationAndLiability()}
      {renderIndemnification()}
      {renderTermination()}
      {renderSeverability()}
      {renderEntireAgreement()}
      {renderContactUs()}
      {renderLastWords()}
    </div>
  );
};

export default TermsAndConditions;
