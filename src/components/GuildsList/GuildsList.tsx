import { useState, useEffect } from "react";
import "./GuildsList.css"

interface Guild {
  id: string;
  name: string;
  icon: string | null;
}

function GuildsList() {
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
          const guilds = message.d.guilds ?? [];
          console.log(`Received ${guilds.length} guilds`);
          setGuilds(guilds);
        }
      };
    };
  }, []);

  return (
    <div className="guild-list">
      {guilds.map((guild) => (
        <div className="guild" key={guild.id}>
          {guild.icon ? <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`} className="guild-icon" alt={guild.name} /> : guild.name}
        </div>
      ))}
    </div>
  );
};

export default GuildsList;
