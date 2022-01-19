import React, { FC } from "react";
import styles from "./Loader.module.css";
import classNames from "classnames";

interface LoaderProps {
  overlay?: boolean;
}

const Loader: FC<LoaderProps> = ({ overlay }) => {
  return (
    <div
      className={classNames(styles.loader, {
        [styles.loader__overlay]: overlay,
      })}
    >
      Wczytuję dane...
    </div>
  );
};

export default Loader;
