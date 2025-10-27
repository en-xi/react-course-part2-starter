import React, { Dispatch } from "react";
import { Task, TaskAction } from "../reducers/taskReducer";

type TasksContext = {
  tasks: Task[];
  dispatch: Dispatch<TaskAction>;
};

const TasksContext = React.createContext<TasksContext>({} as TasksContext);

export default TasksContext;
