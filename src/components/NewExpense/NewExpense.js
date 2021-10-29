import styles from './NewExpense.module.css';
import ExpenseForm from './ExpenseForm';

const NewExpense = ({ onAddExpense }) => {
  const onSaveExpenseDataHandler = (expenseData) => {
    onAddExpense(expenseData);
  };
  return (
    <div className={styles.newExpense}>
      <ExpenseForm onSaveExpenseData={onSaveExpenseDataHandler} />
    </div>
  );
};

export default NewExpense;
