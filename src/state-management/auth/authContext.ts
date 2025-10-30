import React, { Dispatch } from "react";
import { AuthAction } from "./AuthProvider";

type AuthContextType = {
  user: string;
  dispatch: Dispatch<AuthAction>;
};

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
