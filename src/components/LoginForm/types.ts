interface TokenClaims {
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

export interface LoginFormProps {
  onAuth: (auth: BasicAuth) => void;
}
