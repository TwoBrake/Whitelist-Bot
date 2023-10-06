import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { deployCommands } from "@src/deploy-commands";
import { isBotOwner } from "@functions/memberCheck";
import { successEmbed, errorEmbed } from "@functions/embed";

export const data = new SlashCommandBuilder()
  .setName("deploy")
  .setDescription("Deploys commands.");

export async function execute(interaction: CommandInteraction) {
  if (await isBotOwner(interaction)) {
    if (interaction.guildId) {
      await deployCommands({ guildId: interaction.guildId });
      return interaction.reply({
        embeds: [await successEmbed("Successfully deployed commands.")],
        ephemeral: true,
      });
    } else {
      return interaction.reply({
        embeds: [await errorEmbed("Couldn't find guild.")],
        ephemeral: true,
      });
    }
  } else {
    return interaction.reply({
      embeds: [
        await errorEmbed("You don't have permission to run this command."),
      ],
    });
  }
}
