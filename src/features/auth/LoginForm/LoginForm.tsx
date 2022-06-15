import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
import styles from "features/auth/LoginForm/LoginForm.module.css";
import { BasicAuth } from "features/auth/authAPI";
import Button, { ButtonType } from "common/components/Button/Button";
import FlexTest from "common/components/FlexTest/FlexTest";

export interface LoginFormProps {
  onAuth: (auth: BasicAuth) => void;
}

const LoginForm: FC<LoginFormProps> = ({ onAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setUsername(evt.target.value);
  };
  const passwordChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };
  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const auth: BasicAuth = {
      username,
      password,
    };
    onAuth(auth);
    setUsername("");
    setPassword("");
  };

  const subContainerRef = useRef<HTMLDivElement>(null);
  const [isWrapped, setWrapped] = useState(false);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const elementWidth = entry.contentRect.width;
        const parentWidth = entry.target.parentElement?.clientWidth;
        setWrapped(elementWidth === parentWidth);
      }
    });
    if (subContainerRef.current) {
      resizeObserver.observe(subContainerRef.current);
    }
  }, []);

  return (
    <>
      <form onSubmit={submitHandler} className={styles.form}>
        <div>
          <label className={styles.label}>
            Użytkownik
            <input
              type="text"
              value={username}
              onChange={usernameChangeHandler}
              className={styles.input}
              autoFocus
            />
          </label>
        </div>
        <div>
          <label className={styles.label}>
            Hasło
            <input
              type="password"
              value={password}
              onChange={passwordChangeHandler}
              className={styles.input}
            />
          </label>
        </div>
        <Button type={ButtonType.Submit}>Zaloguj</Button>
      </form>
      <FlexTest subContainerRef={subContainerRef} isWrapped={isWrapped} />
      <FlexTest isWrapped={isWrapped} />
    </>
  );
};

export default LoginForm;
