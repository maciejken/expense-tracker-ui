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
  selectExpensesChartInterval,
  selectIsUpdatingExpenses,
} from "features/expenses/expensesSelectors";
import styles from "./App.module.css";

const App: FC = () => {
  const { token, claims } = useAppSelector(selectAuth);
  const chartInterval = useAppSelector(selectExpensesChartInterval);
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
    if (token && !isUpdatingExpenses) {
      dispatch(fetchExpensesChart());
    }
  }, [dispatch, chartInterval, isUpdatingExpenses, token]);

  useEffect(() => {
    if (token && !isUpdatingExpenses) {
      dispatch(fetchExpenses());
    }
  }, [dispatch, isUpdatingExpenses, token]);

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
