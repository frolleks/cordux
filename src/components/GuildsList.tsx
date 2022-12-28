import { useState, useEffect } from "react";

interface Guild {
  id: string;
  name: string;
  icon: string | null;
}

const GuildsList = () => {
  const [guilds, setGuilds] = useState<Guild[]>([]);

  useEffect(() => {
    const TOKEN = localStorage.getItem("token");

    const client = new WebSocket("wss://gateway.discord.gg?encoding=json&v=9");

    client.onopen = () => {
      console.log("Connected to Gateway");

      // Identify the client
      client.send(
        JSON.stringify({
          op: 2,
          d: {
            token: TOKEN,
            shard: [0, 1],
            properties: {
              $os: "windows",
              $browser: "my_app",
              $device: "my_app",
            },
          },
        })
      );

      client.onmessage = (event: MessageEvent) => {
        const message = JSON.parse(event.data);
        if (message.t === "READY") {
          // Received the READY event
          // const guilds = message.d.guilds;
          // if (guilds) {
          //   console.log(`Received ${guilds.length} guilds`);
          // } else {
          //   console.log('No guilds found');
          // }
          const guilds = message.d.guilds ?? [];
          console.log(`Received ${guilds.length} guilds`);
          setGuilds(guilds);
        }
      };
    };
  }, []);

  return (
    <ul>
      {guilds.map((guild) => (
        <li key={guild.id}>{guild.name}</li>
      ))}
    </ul>
  );
};

export default GuildsList;
