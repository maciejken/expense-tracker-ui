import { authUrl } from "app/config";
import http from "services/http";

export interface TokenClaims {
  iat: number;
  exp: number;
  sub: string;
}

export interface TokenData {
  token: string;
  claims: TokenClaims;
}

export interface BasicAuth {
  username: string;
  password: string;
}

export const fetchToken: ({
  username,
  password,
}: BasicAuth) => Promise<TokenData> = async ({ username, password }) => {
  const headers = new Headers();
  const authBase64 = btoa(`${username}:${password}`);
  headers.set("Authorization", `Basic ${authBase64}`);
  return http(authUrl, { headers });
};
