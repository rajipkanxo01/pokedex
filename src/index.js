import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import "../src/css/index.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import { Root } from "./routes/Root";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
