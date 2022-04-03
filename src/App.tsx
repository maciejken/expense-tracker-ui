import { FC, useEffect } from "react";
import Expenses from "features/expenses/Expenses";
import LoginForm from "features/auth/LoginForm";
import { clearAuth, selectAuth } from "features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import styles from "./App.module.css";

const App: FC = () => {
  const { token, claims } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (claims) {
      const { iat, exp } = claims;
      setTimeout(() => {
        dispatch(clearAuth());
      }, (exp - iat) * 1000);
    }
  }, [claims, dispatch]);

  if (!token) {
    return <LoginForm />;
  }

  return (
    <div className={styles.flexContainer}>
      <Expenses />
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default App;
