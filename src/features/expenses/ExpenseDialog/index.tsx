import { useAppDispatch, useAppSelector } from "app/hooks";
import { FC } from "react";
import {
  selectExpensesDateString,
  selectExpensesMode,
} from "../expensesSelectors";
import { addExpense } from "../expensesThunks";
import { ExpensesMode, NewExpenseData } from "../expensesTypes";
import styles from "./ExpenseDialog.module.css";
import ExpenseDialog from "./ExpenseDialog";
import { setExpensesMode } from "../expensesActions";

const ExpenseDialogWrapper: FC = () => {
  const date = useAppSelector(selectExpensesDateString);
  const expensesMode = useAppSelector(selectExpensesMode);
  const dispatch = useAppDispatch();
  const addExpenseHandler = (data: NewExpenseData) => {
    dispatch(addExpense(data));
    dispatch(setExpensesMode(ExpensesMode.Default));
  };
  const cancelHandler = () => {
    dispatch(setExpensesMode(ExpensesMode.Default));
  };

  if (expensesMode !== ExpensesMode.Create) {
    return null;
  }
  return (
    <div className={styles.overlay}>
      <ExpenseDialog
        date={date}
        onAddExpense={addExpenseHandler}
        onCancel={cancelHandler}
      />
    </div>
  );
};

export default ExpenseDialogWrapper;
