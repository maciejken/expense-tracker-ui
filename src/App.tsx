import React, { FC, useEffect } from "react";
import Expenses from "features/expenses/Expenses";
import LoginForm from "features/auth/LoginForm";
import { clearAuth, selectAuth } from "features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  fetchExpenses,
  fetchExpensesChart,
} from "features/expenses/expensesThunks";
import {
  selectExpensesDate,
  selectExpensesDateString,
  selectIsUpdatingExpenses,
} from "features/expenses/expensesSelectors";
import styles from "./App.module.css";

const App: FC = () => {
  const { token, claims } = useAppSelector(selectAuth);
  const dateString = useAppSelector(selectExpensesDateString);
  const { day } = useAppSelector(selectExpensesDate);
  const isUpdatingExpenses = useAppSelector(selectIsUpdatingExpenses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (claims) {
      const { iat, exp } = claims;
      setTimeout(() => {
        dispatch(clearAuth());
      }, (exp - iat) * 1000);
    }
  }, [claims, dispatch]);

  useEffect(() => {
    if (token && !day && !isUpdatingExpenses) {
      dispatch(fetchExpensesChart());
    }
  }, [dispatch, dateString, day, isUpdatingExpenses, token]);

  useEffect(() => {
    if (token && day && !isUpdatingExpenses) {
      dispatch(fetchExpenses());
    }
  }, [day, dispatch, isUpdatingExpenses, token]);

  if (!token) {
    return <LoginForm />;
  }

  return (
    <div className={styles.flexContainer}>
      <Expenses />
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default App;
