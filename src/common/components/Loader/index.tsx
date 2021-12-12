import React, { FC } from "react";
import styles from "./Loader.module.css";
import classNames from "classnames";

interface LoaderProps {
  isOverlay?: boolean;
}

const Loader: FC<LoaderProps> = ({ isOverlay }) => {
  return (
    <div
      className={classNames(styles.loader, {
        [styles.loader__overlay]: isOverlay,
      })}
    >
      Wczytuję dane...
    </div>
  );
};

export default Loader;
