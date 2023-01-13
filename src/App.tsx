import { MantineProvider, Text } from "@mantine/core";
import Login from "./pages/login/Login";

export default function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}
    >
      <Login />
    </MantineProvider>
  );
}
