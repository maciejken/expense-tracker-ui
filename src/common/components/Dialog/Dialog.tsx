import { FC, MouseEventHandler } from "react";
import styles from "./Dialog.module.css";

interface DialogProps {
  title: string;
  onClose: MouseEventHandler<HTMLButtonElement>;
}

const Dialog: FC<DialogProps> = ({ children, title, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <header className={styles.dialogHeader}>
          <span className={styles.dialogTitle}>{title}</span>
          <button onClick={onClose} className={styles.closeButton}>
            <i className="fa fa-times" />
          </button>
        </header>
        <div className={styles.dialogContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
