import { REST, Routes } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";
import print from "@functions/print";

const rest = new REST({ version: "10" }).setToken(config.BOT_TOKEN);

type DeployCommandsProps = {
  guildId: string;
};

export async function deployCommands({ guildId }: DeployCommandsProps) {
  const commandsData = Object.values(commands).map((command) => command.data);

  try {
    print("info", "Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(config.CLIENT_ID, guildId), {
      body: commandsData,
    });

    for (const command of commandsData) {
      const commandName = command.name;
      print("info", `Deploying command /${commandName}.`);
    }

    print("success", "Successfully reloaded application (/) commands.");
  } catch (err) {
    print("error", err);
  }
}
