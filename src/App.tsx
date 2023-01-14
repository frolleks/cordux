import Login from "./pages/login/Login";
import MainApp from "./pages/app/MainApp";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/error/ErrorHandler";
import { MantineProvider } from "@mantine/core";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainApp />} errorElement={<ErrorPage />} />
      <Route path="app" element={<MainApp />} />
      <Route path="login" element={<Login />} />
    </>
  )
);

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
