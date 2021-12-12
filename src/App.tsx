import React, { FC, useEffect } from "react";
import Expenses from "features/expenses/Expenses";
import NewExpense from "features/expenses/NewExpense/NewExpense";
import LoginForm from "features/auth/LoginForm";
import { clearAuth, selectAuth } from "features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchExpenses, selectExpensesStatus } from "features/expenses";
import { Status } from "common/types";

const App: FC = () => {
  const { token, claims } = useAppSelector(selectAuth);
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

  // useEffect(() => {
  //   const getChartData = async () => {
  //     setChartData(await fetchChartData({ token }));
  //     setShouldLoadChart(false);
  //   };
  //   if (token) {
  //     getChartData();
  //   }
  // }, [shouldLoadChart, token]);

  useEffect(() => {
    if (
      token &&
      creationStatus === Status.Idle &&
      updateStatus === Status.Idle &&
      removalStatus === Status.Idle
    ) {
      dispatch(fetchExpenses());
    }
  }, [dispatch, creationStatus, updateStatus, removalStatus, token]);

  // const yearChangeHandler = async (year: string) => {
  //   setSelectedYear(year);
  //   setShouldLoadExpenses(true);
  // };

  // const monthChangeHandler = async (month: string) => {
  //   setSelectedMonth(month);
  //   setShouldLoadExpenses(true);
  // };

  if (!token) {
    return <LoginForm />;
  }

  return (
    <div>
      <NewExpense />
      <Expenses />
    </div>
  );
};

export default App;
