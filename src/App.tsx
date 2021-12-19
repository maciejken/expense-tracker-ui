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
  selectExpensesStatus,
} from "features/expenses/expensesSelectors";
import { Status } from "common/types";

const App: FC = () => {
  const { token, claims } = useAppSelector(selectAuth);
  const chartInterval = useAppSelector(selectExpensesChartInterval);
  const { creationStatus, updateStatus, removalStatus } =
    useAppSelector(selectExpensesStatus);
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
    if (
      token &&
      creationStatus === Status.Idle &&
      updateStatus === Status.Idle &&
      removalStatus === Status.Idle
    ) {
      dispatch(fetchExpenses());
      dispatch(fetchExpensesChart());
    }
  }, [
    dispatch,
    chartInterval,
    creationStatus,
    updateStatus,
    removalStatus,
    token,
  ]);

  if (!token) {
    return <LoginForm />;
  }

  return (
    <div>
      <Expenses />
    </div>
  );
};

export default App;
