import axios from "axios";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const messageAtom = atom<any[]>([]);

function Messages() {
  const [message, setMessage] = useAtom(messageAtom);
  const API_URI = "https://discord.com/api/v9";
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${API_URI}/channels/id/messages`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        setMessage(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <div>
      <ul>
        {message.length > 0 &&
          message
            .sort(
              (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
            )
            .map((msg: any, index: number) => (
              <li key={index}>{msg.content}</li>
            ))}
        {message.length === 0 && <p>Loading...</p>}
      </ul>
    </div>
  );
}

export default Messages;
