import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import styles from "features/auth/LoginForm/LoginForm.module.css";
import { BasicAuth } from "features/auth/authAPI";

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
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={submitHandler} className={styles.loginForm__form}>
      <div>
        <label className={styles.loginForm__label}>Użytkownik
          <input
            type="text"
            value={username}
            onChange={usernameChangeHandler}
            className={styles.loginForm__input}
          />
        </label>
      </div>
      <div>
        <label className={styles.loginForm__label}>Hasło
          <input
            type="password"
            value={password}
            onChange={passwordChangeHandler}
            className={styles.loginForm__input}
          />
        </label>
      </div>
      <button type="submit" className={styles.loginForm__submit}>Zaloguj</button>
    </form>
  );
}

export default LoginForm;
