import React, {
  FC,
  ChangeEventHandler,
  createRef,
  DragEventHandler,
  useState,
} from "react";
import classNames from "classnames";
import { InputType } from "common/types";
import styles from "./ChartBar.module.css";

interface ChartBarProps {
  height: string;
  info?: string;
  active: boolean;
  label?: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onDrop: (id: string, value: string) => void;
  value: string;
}

const ChartBar: FC<ChartBarProps> = ({
  active,
  height,
  info,
  label,
  name,
  onChange,
  onDrop,
  value,
}) => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const inputRef = createRef<HTMLInputElement>();
  const dragEnterHandler: DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    setIsDraggedOver(true);
  };
  const dragExitHandler: DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    setIsDraggedOver(false);
  };
  const dragOverHandler: DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
  };
  const dropHandler: DragEventHandler<HTMLLabelElement> = (e) => {
    const id = e.dataTransfer.getData('itemId');
    onDrop(id, value);
    setIsDraggedOver(false);
  };
  return (
    <div className={styles.chartBar} title={info}>
      <label
        onDragEnter={dragEnterHandler}
        onDragExit={dragExitHandler}
        onDragOver={dragOverHandler}
        onDrop={dropHandler}
        className={classNames(styles.chartBar__bar, {
          [styles.chartBar__barActive]: active,
          [styles.isDraggedOver]: isDraggedOver,
        })}
      >
        <div
          className={classNames(styles.chartBar__fill, {
            [styles.chartBar__fillActive]: active,
          })}
          style={{ height }}
        >
          <input
            ref={inputRef}
            type={InputType.Radio}
            name={name}
            value={value}
            checked={active}
            onChange={onChange}
            className={styles.chartBar__radioInput}
          />
        </div>
      </label>
      <div
        className={classNames(styles.chartBar__label, {
          [styles.chartBar__labelActive]: active,
        })}
      >
        {label}
      </div>
    </div>
  );
};

export default ChartBar;
