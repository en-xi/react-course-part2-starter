import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const axiosInstance = new APIClient<Todo>("/todos");

const useTodos = () => {
  return useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: axiosInstance.getAll,
    staleTime: 3_000,
  });
};

export default useTodos;
