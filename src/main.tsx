import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "bootstrap/dist/css/bootstrap.css";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./routing/routes";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 2,
//       cacheTime: 300_000,
//       staleTime: 3 * 1000,
//       refetchOnWindowFocus: true,
//       refetchOnReconnect: false,
//       refetchOnMount: false,
//     },
//   },
// });

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={routes}></RouterProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
