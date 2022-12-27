import React from "react";
import { createBrowserRouter } from "react-router-dom";
const Login = React.lazy(() => import("./pages/Login/Login"));
const Root = React.lazy(() => import("./pages/Root/Root"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage/ErrorPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;