import { ChangeEvent, FC, FormEvent, useState } from "react";
import styles from "features/auth/LoginForm/LoginForm.module.css";
import { BasicAuth } from "features/auth/authAPI";
import Button, { ButtonType } from "common/components/Button/Button";

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
    <form onSubmit={submitHandler} className={styles.form}>
      <div>
        <label className={styles.label}>Użytkownik
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
        <label className={styles.label}>Hasło
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
  );
}

export default LoginForm;
