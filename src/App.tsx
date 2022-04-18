import { FC, useEffect } from "react";
import Expenses from "features/expenses/Expenses";
import LoginForm from "features/auth/LoginForm";
import { clearAuth, selectAuth } from "features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import styles from "./App.module.css";
import {
  selectExpensesChartStatus,
  selectExpensesStatus,
} from "features/expenses/expensesSelectors";
import { Status } from "common/types";

const App: FC = () => {
  const { token, claims } = useAppSelector(selectAuth);
  const expensesStatus = useAppSelector(selectExpensesStatus);
  const chartStatus = useAppSelector(selectExpensesChartStatus);
  const dispatch = useAppDispatch();

  const isLoading =
    expensesStatus === Status.Loading ||
    expensesStatus === Status.Pending ||
    chartStatus === Status.Loading;

  useEffect(() => {
    if (claims) {
      const { iat, exp } = claims;
      setTimeout(() => {
        dispatch(clearAuth());
      }, (exp - iat) * 1000);
    }
  }, [claims, dispatch]);

  if (!token) {
    return <LoginForm />;
  }

  return (
    <div className={styles.flexContainer}>
      <header className={styles.header}>
        {isLoading && <div className={styles.progress}></div>}
      </header>
      <Expenses />
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default App;
