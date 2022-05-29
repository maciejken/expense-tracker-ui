import {
  ChangeEventHandler,
  DragEventHandler,
  FC,
  FocusEventHandler,
  useState,
} from "react";
import classNames from "classnames";
import { InputType, Size } from "common/types";
import styles from "./ExpenseItem.module.css";
import { ExpenseData, ExpenseUpdate } from "../expensesTypes";
import { getLocalAmount, getLocalFloat } from "utils/number";
import classnames from "classnames";
import Button, {
  ButtonType,
  ButtonVariant,
} from "common/components/Button/Button";
import Dialog from "common/components/Dialog/Dialog";
import CalendarDialog from "common/components/CalendarDialog";

interface ExpenseItemProps extends ExpenseData {
  onDelete: (data: ExpenseData) => void;
  onUpdate: (data: ExpenseUpdate) => void;
}

const ExpenseItem: FC<ExpenseItemProps> = ({
  id,
  amount,
  date,
  isPrivate,
  title,
  onUpdate,
  onDelete,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [updatedTitle, setTitle] = useState<string>(title);
  const [updatedAmount, setAmount] = useState<string>(getLocalFloat(amount));
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const dayOfTheMonth = "" + new Date(date).getDate();
  const [selectedDate, setSelectedDate] = useState<string>(dayOfTheMonth);
  const [year, mm] = date.split("-");
  const month = `${year}-${mm}`;

  const titleChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    setTitle(evt.target.value);
  };

  const amountChangeHandler: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setAmount(evt.target.value);
  };

  const privateClickHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    onUpdate({ isPrivate: !isPrivate });
  };

  const titleBlurHandler: FocusEventHandler<HTMLTextAreaElement> = async () => {
    if (updatedTitle !== title) {
      onUpdate({ title: updatedTitle });
    }
  };

  const amountBlurHandler: FocusEventHandler<HTMLInputElement> = () => {
    if (getLocalFloat(updatedAmount) !== getLocalFloat(amount)) {
      onUpdate({ amount: updatedAmount.replace(",", ".") });
    }
  };

  const handleCalendarOpen = () => {
    setCalendarOpen(true);
  };

  const handleDateChanged = (value: string) => {
    setSelectedDate(value);
    setCalendarOpen(false);
  };

  const handleCalendarClosed = () => {
    setCalendarOpen(false);
  };

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleDelete = () => {
    onDelete({ id, date, title, amount, isPrivate } as ExpenseData);
    setDeleteDialogOpen(false);
  };

  const toggleExpanded = () => {
    setExpanded((expanded) => !expanded);
  };

  const tooltip = title.concat(isPrivate ? " (własny)" : " (wspólny)");

  const dragStartHandler: DragEventHandler<HTMLLIElement> = (e) => {
    e.dataTransfer.setData("itemId", id);
  };

  const getTitle = () => {
    const [hashtag] = updatedTitle.split(" ");
    const inputValue = expanded ? updatedTitle : hashtag;
    return (
      <textarea
        className={classNames(styles.textInput, styles.title, {
          [styles.draggable]: !expanded,
          [styles.textAreaExpanded]: expanded,
        })}
        value={inputValue}
        onChange={titleChangeHandler}
        onBlur={titleBlurHandler}
        disabled={!expanded}
      />
    );
  };

  const getAmount = () => {
    return (
      <input
        className={classNames(styles.textInput, styles.amount, {
          [styles.private]: isPrivate,
          [styles.draggable]: !expanded,
        })}
        type={InputType.Text}
        value={updatedAmount}
        onChange={amountChangeHandler}
        onBlur={amountBlurHandler}
        disabled={!expanded}
      />
    );
  };

  const getDeleteDialog = () => {
    const [hashtag] = updatedTitle.split(" ");
    return (
      <Dialog title="Usuwanie wydatku" onClose={closeDeleteDialog}>
        <div className={styles.dialogPrompt}>
          Usunąć {hashtag} {getLocalAmount(amount)}?
        </div>
        <div className={styles.dialogActions}>
          <Button onClick={handleDelete} variant={ButtonVariant.Secondary}>
            Tak
          </Button>
          <Button onClick={closeDeleteDialog} autoFocus={true}>
            Nie
          </Button>
        </div>
      </Dialog>
    );
  };

  return (
    <li
      className={classNames(styles.accordion, {
        [styles.draggable]: !expanded,
      })}
      title={tooltip}
      draggable={!expanded}
      onDragStart={dragStartHandler}
    >
      <div
        className={classnames(styles.summary, {
          [styles.expanded]: expanded,
        })}
      >
        {getTitle()}
        <div className={styles.right}>
          <div className={styles.row}>
            {getAmount()}
            <button
              title="Rozwiń"
              className={styles.toggle}
              onClick={toggleExpanded}
            >
              <i className={`fa fa-chevron-${expanded ? "up" : "down"}`} />
            </button>
          </div>
          <div className={styles.collapsible}>
            <label className={styles.checkboxLabel}>
              Sumuj
              <input
                type={InputType.Checkbox}
                className={styles.checkbox}
                onChange={privateClickHandler}
                checked={!isPrivate}
              />
            </label>
            <div className={classnames(styles.row, styles.actions)}>
              <Button
                title="Zmień datę"
                size={Size.Small}
                type={ButtonType.Button}
                variant={ButtonVariant.Primary}
                onClick={handleCalendarOpen}
              >
                {dayOfTheMonth}
              </Button>
              <Button
                title="Usuń"
                size={Size.Small}
                type={ButtonType.Button}
                variant={ButtonVariant.Secondary}
                onClick={openDeleteDialog}
              >
                <i className="fa fa-trash" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {calendarOpen && (
        <CalendarDialog
          month={month}
          selectedDate={selectedDate}
          onChange={handleDateChanged}
          onClose={handleCalendarClosed}
        />
      )}
      {deleteDialogOpen && getDeleteDialog()}
    </li>
  );
};

export default ExpenseItem;
