import { useReducer } from "react";
import "./App.css";
import AuthContext from "./state-management/contexts/authContext";
import TasksContextType from "./state-management/contexts/tasksContext";
import HomePage from "./state-management/HomePage";
import NavBar from "./state-management/NavBar";
import authReducer from "./state-management/reducers/authReducer";
import taskReducer from "./state-management/reducers/taskReducer";

function App() {
  const [tasks, tasksDispatch] = useReducer(taskReducer, []);
  const [user, authDispatch] = useReducer(authReducer, "");
  return (
    <AuthContext.Provider value={{ user, dispatch: authDispatch }}>
      <TasksContextType.Provider value={{ tasks, dispatch: tasksDispatch }}>
        <NavBar />
        <HomePage />
      </TasksContextType.Provider>
    </AuthContext.Provider>
  );
}

export default App;
