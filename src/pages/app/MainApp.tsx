import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Messages from "../../components/Messages";

export default function MainApp() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }, [])
  return (
    <Messages />
  )
}
