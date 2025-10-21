import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";
import todoService, { Todo } from "../services/todoService";

type TodoContext = {
  previousTodos: Todo[];
};

const useAddTodo = (resetInputValue: () => void) => {
  const queryClient = useQueryClient();
  const addTodo = useMutation<Todo, Error, Todo, TodoContext>({
    mutationFn: todoService.post,
    onMutate: (newTodo) => {
      const previousTodos =
        queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];

      // APPROACH: Invalidating the cache
      // queryClient.invalidateQueries({
      //   queryKey:['todos']
      // });

      // APPROACH 2: Updating the data in the cache
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) => [
        newTodo,
        ...(todos || []),
      ]);

      resetInputValue();

      return { previousTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueriesData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
        todos?.map((todo) => (todo.title === newTodo.title ? savedTodo : todo))
      );
    },

    onError: (error, newTodo, context) => {
      if (!context) return;
      queryClient.setQueryData(CACHE_KEY_TODOS, context?.previousTodos);
    },
  });

  return addTodo;
};

export default useAddTodo;
