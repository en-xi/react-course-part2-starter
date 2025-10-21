import { useQuery } from "@tanstack/react-query";
import todoService, { Todo } from "../services/todoService";

const useTodos = () => {
  return useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: todoService.getAll,
    staleTime: 3_000,
  });
};

export default useTodos;
