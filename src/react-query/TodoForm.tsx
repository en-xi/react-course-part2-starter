import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import useTodos, { Todo } from "./hooks/useTodos";

type TodoContext = {
  previousTodos: Todo[];
};

const TodoForm = () => {
  useTodos();
  const ref = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const addTodo = useMutation<Todo, Error, Todo, TodoContext>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
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

      if (ref.current) ref.current.value = "";

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

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger"> {addTodo.error.message}</div>
      )}
      <form
        className="row mb-3"
        onSubmit={(e) => {
          e.preventDefault();

          if (ref.current && ref.current.value) {
            addTodo.mutate({
              id: 0,
              title: ref.current.value,
              userId: 1,
              completed: false,
            });
          }
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary" disabled={addTodo.isLoading}>
            {addTodo.isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
