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

export default authReducer;
