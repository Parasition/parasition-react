import React from 'react';
import { Image } from '../image';
import { chevronBlackIcon } from 'resources/images';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Button } from '../button';
import styles from './styles.module.css';

const Accordion = (props) => {
  // PROPS

  const {
    // VALUES
    title,
    subTitle,
    showAccordionContent,
    // FUNCTIONS
    onPressAccordionHeader,
    // STYLES
    accordionContentStyle,
    customAccordionContainerStyle,
    btnTitle,
    onBtnAction,
    // NODE
    children,
  } = props;

  const renderAccordionHeader = () => {
    return (
      <div className={styles.accordion_header} onClick={onPressAccordionHeader}>
        <div className={styles.accordion_header_leftSection}>
          <h5 className={styles.accordion_headerTitle}>
            {title} &nbsp;
            {showAccordionContent && (
              <label className={styles.accordion_headerSubTitle}>
                {subTitle}
              </label>
            )}
          </h5>
          {btnTitle && (
            <Button
              title={btnTitle}
              onClick={(event) => {
                event.stopPropagation();
                onBtnAction && onBtnAction();
              }}
              classname={styles.accordion_header_btnStyle}
            />
          )}
        </div>
        <Image
          image={chevronBlackIcon}
          altText="chevronIcon"
          customImageContainerStyle={
            showAccordionContent
              ? styles.accordion_rotateHeaderIcon
              : styles.accordion_headerIcon
          }
          customImageStyle={styles.accordion_headerIconFit}
        />
      </div>
    );
  };

  const renderAccordionContent = () => {
    return (
      <React.Fragment>
        {showAccordionContent && (
          <div
            className={classNames(
              styles.accordion_content,
              accordionContentStyle
            )}
          >
            {children}
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <div
      className={classNames(
        styles.accordion_container,
        customAccordionContainerStyle
      )}
    >
      {renderAccordionHeader()}
      {renderAccordionContent()}
    </div>
  );
};

Accordion.propTypes = {
  // VALUES
  title: PropTypes.string,
  subTitle: PropTypes.string,
  showAccordionContent: PropTypes.bool,

  // FUNCTIONS
  onPressAccordionHeader: PropTypes.func,

  // STYLES
  accordionContentStyle: PropTypes.string,
  customAccordionContainerStyle: PropTypes.string,

  btnTitle: PropTypes.string,
  onBtnAction: PropTypes.func,

  // NODE
  children: PropTypes.node,
};

export { Accordion };
