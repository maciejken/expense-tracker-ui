import { FC, MouseEventHandler, useEffect } from "react";
import styles from "./Dialog.module.css";

interface DialogProps {
  title: string;
  onClose: MouseEventHandler<HTMLButtonElement>;
  onOpen?: () => void;
}

const Dialog: FC<DialogProps> = ({ children, title, onClose, onOpen }) => {
  useEffect(() => {
    if ("function" === typeof onOpen) {
      onOpen();
    }
  });
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <header className={styles.dialogHeader}>
          <span className={styles.dialogTitle}>{title}</span>
          <button onClick={onClose} className={styles.closeButton}>
            <i className="fa fa-times" />
          </button>
        </header>
        <div className={styles.dialogContent}>{children}</div>
      </div>
    </div>
  );
};

export default Dialog;
