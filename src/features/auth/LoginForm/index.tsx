import { useAppDispatch, useAppSelector } from "app/hooks";
import { BasicAuth } from "features/auth/authAPI";
import { fetchAuthToken, selectAuthStatus } from "features/auth/authSlice";
import LoginForm from "features/auth/LoginForm/LoginForm";
import styles from "./LoginForm.module.css";
import Loader from "common/components/Loader/Loader";
import { Status } from "common/types";

const LoginFormWrapper = () => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);
  const authHandler = (auth: BasicAuth) => {
    dispatch(fetchAuthToken(auth));
  };
  return (
    <div className={styles.formContainer}>
      <LoginForm onAuth={authHandler} />
      {authStatus === Status.Loading && (
        <div className={styles.nodeLoader}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default LoginFormWrapper;
