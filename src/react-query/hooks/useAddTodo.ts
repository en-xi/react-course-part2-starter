import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "./useTodos";

type TodoContext = {
  previousTodos: Todo[];
};

const useAddTodo = (resetInputValue: () => void) => {
  const queryClient = useQueryClient();
  const addTodo = useMutation<Todo, Error, Todo, TodoContext>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todosx", todo)
        .then((res) => res.data),
    onMutate: (newTodo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      // APPROACH: Invalidating the cache
      // queryClient.invalidateQueries({
      //   queryKey:['todos']
      // });

      // APPROACH 2: Updating the data in the cache
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        newTodo,
        ...(todos || []),
      ]);

      resetInputValue();

      return { previousTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueriesData<Todo[]>(["todos"], (todos) =>
        todos?.map((todo) => (todo.title === newTodo.title ? savedTodo : todo))
      );
    },

    onError: (error, newTodo, context) => {
      if (!context) return;
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
  });

  return addTodo;
};

export default useAddTodo;
