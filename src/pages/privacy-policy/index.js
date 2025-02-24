import React, { useEffect } from 'react';
import styles from './styles.module.css';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderOverView = () => {
    return (
      <div className={styles.privacyPolicy_overView}>
        <h1 className={styles.privacyPolicy_title}>Privacy Policy</h1>
        <h5 className={styles.privacyPolicy_lastUpdated}>
          <span>Last Updated:</span> [14/01/2025]
        </h5>
        <p className={styles.privacyPolicy_description}>
          At <b>Parasition.love</b> (the “Platform”), operated by{' '}
          <b>Parasition AB</b> (“we,” “us,” “our”), we value your privacy and
          are committed to protecting your personal data. This Privacy Policy
          explains how we collect, use, disclose, store, and protect your
          personal data when you use our Platform or interact with our services
          (collectively, the “Services”).
        </p>

        <p className={styles.privacyPolicy_description}>
          By using the Platform, you agree to the collection and use of
          information in accordance with this Privacy Policy. If you do not
          agree with any part of this Privacy Policy, you should not use the
          Platform or otherwise provide us with your personal information.
        </p>
      </div>
    );
  };

  const renderWhoWeAre = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBox}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          1. Who We Are
        </h5>
        <div className={styles.termsAndConditions_subClauseLevelTwo}>
          <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
            <li>
              <b>Parasition AB</b>
            </li>
            <li>Based in Sweden</li>
            <li>
              <b>Email:</b> admin@parasition.com
            </li>
          </ul>
        </div>
        <p className={styles.termsAndConditions_subClauseDesc}>
          We primarily provide a platform for businesses to create and manage
          advertising campaigns with various creators and influencers.
        </p>
      </div>
    );
  };

  const renderScopeOfPrivacy = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBoxWithBorder}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          2. Scope of This Privacy Policy
        </h5>
        <p className={styles.termsAndConditions_subClauseDesc}>
          This Privacy Policy applies to personal data collected through the
          Platform <b>(Parasition.love)</b> and any related online or offline
          channels where we may collect personal data for our Services (e.g.,
          via email inquiries, invoicing, etc.).
        </p>
      </div>
    );
  };

  const renderInformationWeCollect = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBoxWithBorder}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          3. Information We Collect
        </h5>
        <div className={styles.termsAndConditions_subClauseLevelTwo}>
          <h6 className={styles.termsAndConditions_subClauseTitle}>
            3.1 Personal Data You Provide
          </h6>
          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            1. Account Registration
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                <b>Name</b> (and/or authorized representative’s name)
              </li>
              <li>
                <b>Company Information</b> (business name, address)
              </li>
              <li>
                <b>Email Address</b>
              </li>
              <li>
                <b>Phone Number</b>
              </li>
            </ul>
          </ul>

          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            2. Communications
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                When you contact us via email or other channels, we may collect
                your name, contact information, and the contents of your
                message.
              </li>
            </ul>
          </ul>

          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            3. Payment Information
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                We process payments via <b>Stripe</b> or invoice. Although we do
                not store full payment card details on our servers, we may store
                transaction-related information such as the amount paid, billing
                address, and partial card details or transaction IDs as needed
                for invoicing and record-keeping.
              </li>
            </ul>
          </ul>
        </div>

        <div className={styles.termsAndConditions_subClauseLevelTwo}>
          <h6 className={styles.termsAndConditions_subClauseTitle}>
            3.2 Data We Collect Automatically
          </h6>
          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            <p>
              1. Usage Data &nbsp;
              <span
                className={styles.termsAndConditions_subClauseThreeSubTitle}
              >
                (if implemented in the future)
              </span>
            </p>
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                We currently do not use cookies or other tracking technologies
                on the Platform. However, if we add such technologies later, we
                may automatically collect information about how you access and
                interact with the Platform (e.g., IP address, browser type,
                device information).
              </li>
            </ul>
          </ul>

          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            2. Log Data
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                Our server logs may record certain information about each
                request to the Platform, such as IP address, request date/time,
                referral URLs, etc. We use this for security and system
                administration.
              </li>
            </ul>
          </ul>
        </div>

        <div className={styles.termsAndConditions_subClauseLevelTwo}>
          <h6 className={styles.termsAndConditions_subClauseTitle}>
            3.3 Data from Third Parties
          </h6>
          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            Creators/Influencers
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                When you create a campaign brief, we may share or receive data
                with/from the creators or influencers helping with your
                campaigns. For example, a creator may need basic information
                about your company to ensure correct content and compliance.
              </li>
            </ul>
          </ul>

          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            <p>
              Analytics Providers &nbsp;
              <span
                className={styles.termsAndConditions_subClauseThreeSubTitle}
              >
                (if implemented in the future)
              </span>
            </p>
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                In the future, if we use third-party analytics services, they
                may provide us with aggregated or anonymized statistics about
                user behavior.
              </li>
            </ul>
          </ul>
        </div>
      </div>
    );
  };

  const renderHowWeUseOurInformation = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBoxWithBorder}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          4. How We Use Your Information
        </h5>
        <div className={styles.termsAndConditions_subClauseLevelTwo}>
          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            1.Providing Services
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>To create and manage advertising campaigns.</li>
              <li>To enable communication with creators/influencers.</li>
              <li>To process payments (via Stripe or invoicing).</li>
            </ul>
          </ul>

          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            2.Account Management
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                To manage user accounts, provide customer support, and send
                administrative or account-related communications (e.g., password
                resets).
              </li>
            </ul>
          </ul>

          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            3.Marketing & Communications
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                If you opt in to marketing communications, we may send you
                updates or offers about our Services or related opportunities.
                You can opt out at any time.
              </li>
            </ul>
          </ul>

          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            4. Legal & Compliance
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                To comply with Swedish, EU, or other applicable laws,
                regulations, or legal processes.
              </li>

              <li>
                To enforce our Terms of Service or other contractual
                obligations.
              </li>

              <li>
                To protect our rights, privacy, safety, or property, or that of
                our users, affiliates, or other parties.
              </li>
            </ul>
          </ul>

          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            4. Business Development
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                For internal purposes such as auditing, data analysis, research,
                and improving our Services.
              </li>

              <li>
                If we introduce subscriptions or additional functionalities in
                the future, we may use your information to inform you about
                those new features.
              </li>
            </ul>
          </ul>
        </div>
      </div>
    );
  };

  const renderLegalBasisForRendering = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBoxWithBorder}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          5. Legal Basis for Processing (GDPR)
        </h5>

        <p className={styles.termsAndConditions_subClauseDesc}>
          <b> Under the General Data Protection Regulation (GDPR),</b> we rely
          on the following legal bases:
        </p>
        <div className={styles.termsAndConditions_subClauseLevelTwo}>
          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            1. Contractual Necessity
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                We process personal data to provide the Services you request
                (e.g., account creation, campaign management).
              </li>
            </ul>
          </ul>

          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            2. Legitimate Interests
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                We may process your personal data for our legitimate interests
                in improving our Services, preventing fraud, or securing the
                Platform, provided these interests are not overridden by your
                data protection rights.
              </li>
            </ul>
          </ul>

          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            3.Consent
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                Where required by law (e.g., for certain marketing
                communications), we will rely on your consent, which you may
                withdraw at any time.
              </li>
            </ul>
          </ul>

          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            4. Legal Obligations
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                We may process your personal data to comply with applicable
                legal and regulatory obligations, such as record-keeping and tax
                laws.
              </li>
            </ul>
          </ul>
        </div>
      </div>
    );
  };

  const renderDisclosureInformation = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBoxWithBorder}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          6. Disclosure of Your Information
        </h5>

        <p className={styles.termsAndConditions_subClauseDesc}>
          We do not sell or rent your personal data to third parties. However,
          we may share your personal data under the following circumstances:
        </p>
        <div className={styles.termsAndConditions_subClauseLevelTwo}>
          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            1.Service Providers
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                With third-party vendors who perform services on our behalf
                (e.g., payment processing via Stripe, hosting providers). These
                parties are required to use your personal data only as necessary
                to provide these services and must adhere to data protection
                obligations.
              </li>
            </ul>
          </ul>

          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            2. Creators/Influencers
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                Essential information about your company or campaign may be
                shared with the creators/influencers you engage through our
                Platform to fulfill the scope of the advertising campaign.
              </li>
            </ul>
          </ul>

          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            3. Business Transfers
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                In connection with any merger, sale of company assets,
                financing, or acquisition of all or a portion of our business by
                another company.
              </li>
            </ul>
          </ul>

          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            4. Legal Compliance
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                If required by law, court order, or other governmental request,
                or if we believe disclosure is necessary to comply with legal
                obligations or protect our rights.
              </li>
            </ul>
          </ul>
        </div>
      </div>
    );
  };

  const renderInternationalDataTransfers = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBoxWithBorder}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          7. International Data Transfers
        </h5>

        <p className={styles.termsAndConditions_subClauseDesc}>
          We primarily operate from <b>Sweden (EU/EEA).</b> If you are located
          in another country, your personal data may be transferred to, stored,
          and processed in Sweden or other countries that may not provide the
          same level of data protection as your home country. We will take
          appropriate measures, such as &nbsp;
          <b>Standard Contractual Clauses (SCCs)</b> or other lawful mechanisms,
          to ensure that your personal data remains protected in accordance with
          this Privacy Policy and applicable data protection laws.
        </p>
      </div>
    );
  };

  const renderYourRights = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBoxWithBorder}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          8. Your Rights (GDPR & CCPA)
        </h5>

        <div className={styles.termsAndConditions_subClauseLevelTwo}>
          <div className={styles.termsAndConditions_subClauseLevelTwo}>
            <ul className={styles.termsAndConditions_subClauseLevelThree}>
              8.1 EU Data Subject Rights
              <p className={styles.termsAndConditions_subClauseDesc}>
                If you are located in the <b>EU/EEA</b>,you have the following
                rights under GDPR:
              </p>
              <ul
                className={styles.termsAndConditions_subClauseLevelTwoDesc}
                style={{ listStyleType: 'decimal' }}
              >
                <li>
                  <b>Access –</b> You can request information about the personal
                  data we hold about you and obtain a copy.
                </li>
                <li>
                  <b>Rectification –</b>
                  You can request correction of inaccurate or incomplete
                  personal data.
                </li>

                <li>
                  <b>Erasure</b> &nbsp; (“Right to be Forgotten”) – You can
                  request deletion of your personal data, subject to certain
                  legal exceptions.
                </li>

                <li>
                  <b>Restriction of Processing – </b>You can request we limit
                  the processing of your personal data.
                </li>

                <li>
                  <b>Data Portability – </b>You can request a copy of your
                  personal data in a structured, commonly used, and
                  machine-readable format.
                </li>

                <li>
                  <b>Objection – </b>You can object to processing based on our
                  legitimate interests or for direct marketing purposes.
                </li>

                <li>
                  <b>Withdraw Consent – </b>YWhere we rely on consent, you may
                  withdraw it at any time.
                </li>
              </ul>
            </ul>
            <p className={styles.termsAndConditions_subClauseDesc}>
              To exercise any of these rights, please contact us at
              <b>admin@parasition.com.</b> We may ask for additional information
              to verify your identity.
            </p>

            <p className={styles.termsAndConditions_subClauseDesc}>
              If you believe we have infringed your rights, you have the right
              to file a complaint with your local data protection authority in
              the EU/EEA or with the Swedish Authority for Privacy Protection
              &nbsp;
              <b>(Integritetsskyddsmyndigheten, IMY).</b>
            </p>
          </div>

          <div className={styles.termsAndConditions_subClauseLevelTwo}>
            <ul className={styles.termsAndConditions_subClauseLevelThree}>
              8.2 California Consumer Rights (CCPA)
              <p className={styles.termsAndConditions_subClauseDesc}>
                If you are a <b>California resident</b>, the{' '}
                <b>California Consumer Privacy Act (CCPA)</b> may grant you the
                following rights:
              </p>
              <ul
                className={styles.termsAndConditions_subClauseLevelTwoDesc}
                style={{ listStyleType: 'decimal' }}
              >
                <li>
                  <b>Right to Know –</b>You can request information about the
                  personal data we have collected about you in the past 12
                  months.
                </li>
                <li>
                  <b> Right to Delete – </b>
                  You can request deletion of your personal data, subject to
                  certain exceptions.
                </li>

                <li>
                  <b>Right to Opt Out of “Sale” </b>
                  of Personal Information – We do not sell or rent your personal
                  data; therefore, this right does not apply.
                </li>

                <li>
                  <b>Right to Non-Discrimination – </b>We will not discriminate
                  against you for exercising any of these rights.
                </li>
              </ul>
            </ul>
            <p className={styles.termsAndConditions_subClauseDesc}>
              To exercise your CCPA rights, contact us at
              <b>admin@parasition.com.</b>
              We may verify your request by asking for information that matches
              our records.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderDataRetention = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBoxWithBorder}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          9. Data Retention
        </h5>

        <p className={styles.termsAndConditions_subClauseDesc}>
          We retain your personal data for as long as is necessary to fulfill
          the purposes outlined in this Privacy Policy, unless a longer
          retention period is required or allowed by law. Criteria for retention
          include:
        </p>
        <div className={styles.termsAndConditions_subClauseLevelTwo}>
          <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
            <li>
              <b>Legal and regulatory requirements</b>
            </li>
            <li>
              <b>Business needs </b>(e.g., record-keeping, accounting, tax
              reporting)
            </li>
            <li>
              <b>Resolution of disputes</b> and enforcement of our agreements
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const renderSecurity = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBoxWithBorder}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          10. Security
        </h5>

        <p className={styles.termsAndConditions_subClauseDesc}>
          We take <b>commercially reasonable measures</b> to protect personal
          data from loss, misuse, unauthorized access, disclosure, alteration,
          or destruction. However, no electronic transmission or storage method
          is 100% secure. You use the Platform at your own risk.
        </p>
      </div>
    );
  };

  const renderChildrenPrivacy = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBoxWithBorder}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          11. Children’s Privacy
        </h5>

        <p className={styles.termsAndConditions_subClauseDesc}>
          Our Services are intended for businesses and are{' '}
          <b>not directed at minors.</b> We do not knowingly collect personal
          data from children. If you believe we have inadvertently collected
          information from a minor, please contact us at{' '}
          <b>admin@parasition.com</b> to request deletion.
        </p>
      </div>
    );
  };

  const renderThirdPartyLinksAndIntegrations = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBoxWithBorder}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          12. Third-Party Links & Integrations
        </h5>

        <p className={styles.termsAndConditions_subClauseDesc}>
          Our Platform may contain links to third-party websites or integrations
          (e.g., payment processors like Stripe). We do not control these third
          parties, and their privacy practices may differ from ours. We
          encourage you to review the privacy policies of these third-party
          services before providing any personal data to them.
        </p>
      </div>
    );
  };

  const renderChangesToPrivacyPolicy = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBoxWithBorder}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          13. Changes to This Privacy Policy
        </h5>

        <p className={styles.termsAndConditions_subClauseDesc}>
          We may update this Privacy Policy from time to time. The “Last
          Updated” date at the top of this page indicates when revisions were
          made. We will make reasonable efforts to notify you of significant
          changes (e.g., via email or a prominent notice on the Platform). Your
          continued use of the Platform after any changes signifies your
          acceptance of the updated policy.
        </p>
      </div>
    );
  };

  const renderContactUs = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBoxWithBorder}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          14. Contact Us
        </h5>
        <p className={styles.termsAndConditions_subClauseDesc}>
          If you have any questions or concerns about this Privacy Policy or our
          data practices, please contact us at:
        </p>
        <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
          <li>
            <b>Email:</b> admin@parasition.com
          </li>
        </ul>
      </div>
    );
  };

  const renderAdditionalImplementNotes = () => {
    return (
      <div className={styles.termsAndConditions_keyPointBoxWithBorder}>
        <h5 className={styles.termsAndConditions_subClauseTitle}>
          Additional Implementation Notes
        </h5>

        <div className={styles.termsAndConditions_subClauseLevelTwo}>
          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            1. Check Local Requirements
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                Ensure compliance with Swedish data protection laws, as well as
                broader EU (GDPR) and U.S. (CCPA) requirements.
              </li>
            </ul>
          </ul>

          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            2. Detail on Cookies
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                If you decide to implement cookies or other tracking
                technologies in the future, update this policy and, where
                necessary, provide a cookie banner or consent mechanism.
              </li>
            </ul>
          </ul>

          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            3. Future Subscriptions
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                If you add subscription services or automated data processing
                for marketing, you may need to update the policy to reflect
                changes in data collection and usage.
              </li>
            </ul>
          </ul>

          <ul className={styles.termsAndConditions_subClauseLevelThree}>
            4. Data Protection Officer (DPO) (Optional)
            <ul className={styles.termsAndConditions_subClauseLevelTwoDesc}>
              <li>
                Under certain conditions (e.g., large-scale data processing in
                the EU), you may be required to appoint a DPO. If so, update the
                contact details accordingly.
              </li>
            </ul>
          </ul>
        </div>
      </div>
    );
  };

  const renderDisclaimer = () => {
    return (
      <p className={styles.termsAndConditions_disclaimer}>
        <b>Disclaimer:</b> This policy is a template based on the details you
        provided and should be reviewed by a legal expert to ensure full
        compliance with all relevant laws and regulations. If you have specific
        questions about any legal matters, you should consult a lawyer or other
        professional legal services.
      </p>
    );
  };

  return (
    <div className={styles.privacyPolicy_container}>
      {renderOverView()}
      {renderWhoWeAre()}
      {renderScopeOfPrivacy()}
      {renderInformationWeCollect()}
      {renderHowWeUseOurInformation()}
      {renderLegalBasisForRendering()}
      {renderDisclosureInformation()}
      {renderInternationalDataTransfers()}
      {renderYourRights()}
      {renderDataRetention()}
      {renderSecurity()}
      {renderChildrenPrivacy()}
      {renderThirdPartyLinksAndIntegrations()}
      {renderChangesToPrivacyPolicy()}
      {renderContactUs()}
      {renderAdditionalImplementNotes()}
      {renderDisclaimer()}
    </div>
  );
};

export default PrivacyPolicy;
