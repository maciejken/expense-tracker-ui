import { FC } from "react";
import { useAppDispatch } from "app/hooks";
import { BasicAuth } from "features/auth/authAPI";
import { fetchAuthToken } from "features/auth/authSlice";
import LoginForm from "features/auth/LoginForm/LoginForm";

const LoginFormWrapper: FC = () => {
  const dispatch = useAppDispatch();
  const authHandler = (auth: BasicAuth) => {
    dispatch(fetchAuthToken(auth));
  };
  return <LoginForm onAuth={authHandler}/>
};

export default LoginFormWrapper;
