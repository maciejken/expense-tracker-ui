import { TokenData, BasicAuth } from "../components/LoginForm/types";
import http from "./http";

export const fetchToken: ({
  username,
  password,
}: BasicAuth) => Promise<TokenData> = async ({ username, password }) => {
  const headers = new Headers();
  const authBase64 = btoa(`${username}:${password}`);
  headers.set('Authorization', `Basic ${authBase64}`);
  return http(`http://localhost:3001/api/auth`, { headers });
};
