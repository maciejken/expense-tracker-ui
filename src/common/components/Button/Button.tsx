import classNames from "classnames";
import { Size } from "common/types";
import { FC, MouseEventHandler } from "react";
import styles from "./Button.module.css";

export enum ButtonVariant {
  Primary = "primary",
  Secondary = "secondary",
}

export enum ButtonType {
  Button = "button",
  Submit = "submit",
}

interface ButtonProps {
  autoFocus?: boolean;
  disabled?: boolean;
  size?: Size;
  title?: string;
  type?: ButtonType;
  variant?: ButtonVariant;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({
  autoFocus,
  children,
  disabled,
  size,
  title,
  type = ButtonType.Button,
  variant = ButtonVariant.Primary,
  onClick,
}) => {
  return (
    <button
      autoFocus={autoFocus}
      disabled={disabled}
      title={title}
      type={type}
      className={classNames(styles.button, {
        [styles.secondary]: variant === ButtonVariant.Secondary,
        [styles.small]: size === Size.Small,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
