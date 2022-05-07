import classNames from "classnames";
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

export enum ButtonSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

interface ButtonProps {
  autoFocus?: boolean;
  disabled?: boolean;
  size?: ButtonSize;
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
        [styles.small]: size === ButtonSize.Small,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
