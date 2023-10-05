import {
  CommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  codeBlock,
} from "discord.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const data = new SlashCommandBuilder()
  .setName("key")
  .setDescription("If you are whitelisted, this will get your key.");

export async function execute(interaction: CommandInteraction) {
  try {
    const databaseUser = await prisma.user.findUnique({
      where: {
        id: parseInt(interaction.user.id),
      },
    });
    //* Check if the user exists in the database.
    if (databaseUser) {
      const keyEmbed = new EmbedBuilder()
        .setTitle("Success")
        .setDescription(
          `We successfully found your key in our database. Here is your key:\n${codeBlock(
            databaseUser.key
          )}`
        )
        .setColor("Green");
      return interaction.reply({ embeds: [keyEmbed], ephemeral: true });
    } else {
      const errorEmbed = new EmbedBuilder()
        .setTitle("You are not whitelisted.")
        .setColor("Red");
      return interaction.reply({ embeds: [errorEmbed] });
    }
  } catch {
    const errorEmbed = new EmbedBuilder()
      .setTitle("Something went wrong.")
      .setColor("Red");
    return interaction.reply({ embeds: [errorEmbed] });
  }
}
