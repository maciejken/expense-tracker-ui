import { FC, useState } from "react";
import { useAppDispatch } from "app/hooks";
import { BasicAuth } from "features/auth/authAPI";
import { fetchAuthToken } from "features/auth/authSlice";
import LoginForm from "features/auth/LoginForm/LoginForm";
import styles from "./LoginForm.module.css";
import Loader from "common/components/Loader/Loader";

const LoginFormWrapper: FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const authHandler = (auth: BasicAuth) => {
    setIsLoading(true);
    dispatch(fetchAuthToken(auth));
  };
  return (
    <div className={styles.formContainer}>
      <LoginForm onAuth={authHandler} />
      {isLoading && <Loader />}
    </div>
  );
};

export default LoginFormWrapper;
