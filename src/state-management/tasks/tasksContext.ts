import React, { Dispatch } from "react";
import { Task, TaskAction } from "./TasksProvider";

type TasksContextType = {
  tasks: Task[];
  dispatch: Dispatch<TaskAction>;
};

const TasksContext = React.createContext<TasksContextType>(
  {} as TasksContextType
);

export default TasksContext;
