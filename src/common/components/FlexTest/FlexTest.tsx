import classNames from "classnames";
import { RefObject } from "react";
import styles from "./FlexTest.module.css";

interface Props {
  subContainerRef?: RefObject<HTMLDivElement>;
  isWrapped?: boolean;
}

const FlexTest: React.FC<Props> = ({ subContainerRef, isWrapped = false }) => {
  const shouldShowFirstCol = !isWrapped || subContainerRef;
  return (
    <div className={styles.rootContainer}>
      {shouldShowFirstCol && <div className={styles.col}></div>}
      {shouldShowFirstCol && (
        <div
          className={classNames(styles.flexibleGap, {
            [styles.biggerGap]: isWrapped,
          })}
        ></div>
      )}
      <div className={styles.subContainer} ref={subContainerRef}>
        <div className={styles.col}></div>
        <div className={styles.flexibleGap}></div>
        <div className={styles.col}></div>
        <div className={styles.flexibleGap}></div>
        <div className={styles.col}></div>
        {!isWrapped && <div className={styles.flexibleGap}></div>}
        {!isWrapped && <div className={styles.col}></div>}
      </div>
    </div>
  );
};

export default FlexTest;
