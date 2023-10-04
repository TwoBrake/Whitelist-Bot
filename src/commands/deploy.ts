import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { deployCommands } from "../deploy-commands";

export const data = new SlashCommandBuilder()
  .setName("deploy")
  .setDescription("Deploys commands.");

export async function execute(interaction: CommandInteraction) {
  if (interaction.guildId) {
    await deployCommands({ guildId: interaction.guildId });
    return interaction.reply("Deployed commands.");
  } else {
    return interaction.reply("Not in a guild.");
  }
}
