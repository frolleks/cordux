import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";

const GuildsList = React.lazy(() => import("../../components/GuildsList/GuildsList"));
const Loader = React.lazy(() => import("../../components/Loader/Loader"));

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token) {
      const navigateToLogin: React.MouseEventHandler = (event) => {
        event.preventDefault();
        navigate("/login");
      };
      navigateToLogin;
    }
  }, [token]); // make sure to add the token dependency so the useEffect hook doesn't run indefinitely

  return (
    <Suspense fallback={<Loader />}>
      <GuildsList />
    </Suspense>
  );
}

export default App;
