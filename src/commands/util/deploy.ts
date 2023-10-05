import {
  EmbedBuilder,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { deployCommands } from "@src/deploy-commands";
import { isBotOwner } from "@functions/memberCheck";

export const data = new SlashCommandBuilder()
  .setName("deploy")
  .setDescription("Deploys commands.");

export async function execute(interaction: CommandInteraction) {
  if (await isBotOwner(interaction)) {
    if (interaction.guildId) {
      await deployCommands({ guildId: interaction.guildId });
      const successEmbed = new EmbedBuilder()
        .setTitle("Deployed commands.")
        .setColor("Green");
      return interaction.reply({ embeds: [successEmbed] });
    } else {
      const errorEmbed = new EmbedBuilder()
        .setTitle("Not in a guild.")
        .setColor("Red");
      return interaction.reply({ embeds: [errorEmbed] });
    }
  } else {
    const errorEmbed = new EmbedBuilder()
      .setTitle("You don't have permission to run this command.")
      .setColor("Red");
    return interaction.reply({ embeds: [errorEmbed] });
  }
}
