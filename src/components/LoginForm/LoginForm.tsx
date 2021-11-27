import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import styles from "./LoginForm.module.scss";
import { BasicAuth, LoginFormProps } from "./types";

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
        <label className={styles.loginForm__label}>Użytkownik</label>
        <input
          type="text"
          value={username}
          onChange={usernameChangeHandler}
          className={styles.loginForm__input}
        />
      </div>
      <div>
        <label className={styles.loginForm__label}>Hasło</label>
        <input
          type="password"
          value={password}
          onChange={passwordChangeHandler}
          className={styles.loginForm__input}
        />
      </div>
      <button type="submit" className={styles.loginForm__submit}>Zaloguj</button>
    </form>
  );
}

export default LoginForm;
