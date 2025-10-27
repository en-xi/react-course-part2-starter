type Login = {
  type: "LOGIN";
  user: string;
};

type Logout = {
  type: "LOGOUT";
};

type Action = Login | Logout;

const authReducer = (state: string, action: Action): string => {
  switch (action.type) {
    case "LOGIN":
      return action.user;
    case "LOGOUT":
      return "";
  }
  return state;
};

export default authReducer;
