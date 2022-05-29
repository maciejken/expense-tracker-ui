import classNames from "classnames";
import { Size } from "common/types";
import { FC } from "react";
import styles from "./Loader.module.css";

interface LoaderProps {
  size?: Size;
}

const classMap = {
  [Size.Large]: undefined,
  [Size.Medium]: styles.hexMedium,
  [Size.Small]: styles.hexSmall,
};

const Loader: FC<LoaderProps> = ({ size = Size.Large }) => {
  return (
    <div className={classNames(styles.hexContainer, classMap[size])}>
      <div className={classNames(styles.hex, styles.hex1)}></div>
      <div className={classNames(styles.hex, styles.hex2)}></div>
      <div className={classNames(styles.hex, styles.hex3)}></div>
      <div className={classNames(styles.hex, styles.hex4)}></div>
      <div className={classNames(styles.hex, styles.hex5)}></div>
      <div className={classNames(styles.hex, styles.hex6)}></div>
    </div>
  );
};

export default Loader;
