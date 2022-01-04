import { useAppDispatch, useAppSelector } from "app/hooks";
import React, { FC } from "react";
import { Interval } from "utils/date";
import { selectExpensesChartInterval } from "../expensesSelectors";
import { removeExpense, updateExpense } from "../expensesThunks";
import { ExpenseData, ExpenseUpdate } from "../expensesTypes";
import ExpenseItem from "./ExpenseItem";

const ExpenseItemWrapper: FC<ExpenseData> = ({ id, date, title, amount, isPrivate }) => {
  const dispatch = useAppDispatch();
  const interval = useAppSelector(selectExpensesChartInterval);
  const updateHandler = (data: ExpenseUpdate) => {
    dispatch(updateExpense({ id, data }))
  };
  const deleteHandler = (data: ExpenseData) => {
    dispatch(removeExpense(data));
  };

  return <ExpenseItem
    id={id}
    date={date}
    title={title}
    amount={amount}
    isPrivate={isPrivate}
    onUpdate={updateHandler}
    onDelete={deleteHandler}
    isDraggable={interval === Interval.Day}
  />
};

export default ExpenseItemWrapper;