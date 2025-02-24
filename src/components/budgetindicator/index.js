import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const BudgetIndicator = (props) => {
  // PROPS

  const { totalAmount, spentAmount } = props;

  const percentage = Math.min((spentAmount / totalAmount) * 100, 100);

  return (
    <div className={styles.budgetIndicator_container}>
      <label className={styles.budgetIndicator_label}>Budget Spend</label>
      <div className={styles.budgetIndicator_amount}>
        <span className={styles.budgetIndicator_spentAmount}>
          $ {spentAmount}
        </span>{' '}
        &nbsp;
        <span className={styles.budgetIndicator_separator}>/</span> &nbsp;
        <span className={styles.budgetIndicator_totalAmount}>
          $ {totalAmount}
        </span>
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

BudgetIndicator.propTypes = {
  totalAmount: PropTypes.string,
  spentAmount: PropTypes.string,
};

export { BudgetIndicator };
