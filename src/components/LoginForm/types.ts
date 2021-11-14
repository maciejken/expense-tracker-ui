export interface TokenData {
  token: string;
}

export interface BasicAuth {
  username: string;
  password: string;
}

export interface LoginFormProps {
  onAuth: (auth: BasicAuth) => void;
}
