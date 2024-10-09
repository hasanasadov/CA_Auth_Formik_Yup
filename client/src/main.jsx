import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./store";

import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Toaster richColors />
    <RouterProvider router={router} />
  </Provider>
);
