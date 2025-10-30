import { ReactNode, useReducer } from "react";
import AuthContext from "./authContext";

type Login = {
  type: "LOGIN";
  user: string;
};

type Logout = {
  type: "LOGOUT";
};

export type AuthAction = Login | Logout;

const authReducer = (state: string, action: AuthAction): string => {
  switch (action.type) {
    case "LOGIN":
      return action.user;
    case "LOGOUT":
      return "";
  }
  return state;
};

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [user, dispatch] = useReducer(authReducer, "");
  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
