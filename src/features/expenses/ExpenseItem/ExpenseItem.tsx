import {
  ChangeEventHandler,
  DragEventHandler,
  FC,
  FocusEventHandler,
  useState,
} from "react";
import classNames from "classnames";
import { InputType } from "common/types";
import styles from "./ExpenseItem.module.css";
import { ExpenseData, ExpenseUpdate } from "../expensesTypes";
import { getLocalAmount, getLocalFloat } from "utils/number";
import classnames from "classnames";
import Button, {
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from "common/components/Button/Button";

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
  const [updatedTitle, setTitle] = useState<string>(title);
  const [updatedAmount, setAmount] = useState<string>(getLocalFloat(amount));
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const titleChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    setTitle(evt.target.value);
  };

  const amountChangeHandler: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setAmount(evt.target.value);
  };

  const waitForIt = async (fn: () => Promise<void>) => {
    setIsLoading(true);
    await fn();
    setIsLoading(false);
  };

  const privateClickHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      "Czy chcesz zmienić widoczność wydatku?"
    );
    if (isConfirmed) {
      waitForIt(async () => onUpdate({ isPrivate: !isPrivate }));
    }
  };

  const titleBlurHandler: FocusEventHandler<HTMLTextAreaElement> = async () => {
    if (updatedTitle !== title) {
      waitForIt(async () => onUpdate({ title: updatedTitle }));
    }
  };

  const amountBlurHandler: FocusEventHandler<HTMLInputElement> = () => {
    if (getLocalFloat(updatedAmount) !== getLocalFloat(amount)) {
      waitForIt(async () =>
        onUpdate({ amount: updatedAmount.replace(",", ".") })
      );
    }
  };

  const deleteHandler = () => {
    const isConfirmed = window.confirm(
      `Usunąć ${title} (${getLocalAmount(amount)})?`
    );
    if (isConfirmed) {
      waitForIt(async () =>
        onDelete({ id, date, title, amount, isPrivate } as ExpenseData)
      );
    }
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

  return (
    <li
      className={classNames(styles.accordion, {
        [styles.draggable]: !expanded,
      })}
      title={tooltip}
      draggable={!expanded}
      onDragStart={dragStartHandler}
    >
      <header
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
          <div className={styles.row}>
            <label className={styles.checkboxLabel}>
              <input
                type={InputType.Checkbox}
                className={styles.checkbox}
                onChange={privateClickHandler}
                checked={!isPrivate}
              />
              Sumuj
            </label>
            <Button
              title="Usuń"
              size={ButtonSize.Small}
              type={ButtonType.Button}
              variant={ButtonVariant.Secondary}
              onClick={deleteHandler}
            >
              Usuń
            </Button>
          </div>
        </div>
      </header>
    </li>
  );
};

export default ExpenseItem;
