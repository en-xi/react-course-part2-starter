import { useReducer } from "react";
import "./App.css";
import AuthProvider from "./state-management/AuthProvider";
import TasksContextType from "./state-management/contexts/tasksContext";
import HomePage from "./state-management/HomePage";
import NavBar from "./state-management/NavBar";
import taskReducer from "./state-management/reducers/taskReducer";

function App() {
  const [tasks, tasksDispatch] = useReducer(taskReducer, []);

  return (
    <AuthProvider>
      <TasksContextType.Provider value={{ tasks, dispatch: tasksDispatch }}>
        <NavBar />
        <HomePage />
      </TasksContextType.Provider>
    </AuthProvider>
  );
}

export default App;
