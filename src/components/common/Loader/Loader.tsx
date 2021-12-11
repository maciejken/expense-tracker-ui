import React, { FC } from "react";
import styles from "components/common/Loader/Loader.module.css";
import { LoaderProps } from "components/common/Loader/types";
import classNames from "classnames";

const Loader: FC<LoaderProps> = ({ isOverlay }) => {
  return <div className={classNames(styles.loader, {
    [styles.loader__overlay]: isOverlay,
  })}>Wczytuję dane...</div>;
};

export default Loader;
