import {
  CommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const data = new SlashCommandBuilder()
  .setName("unwhitelist")
  .setDescription("Unwhitelists a user.")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("The user to unwhitelist.")
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
  try {
    const user = interaction.options.getUser("user");
    if (user) {
      const databaseUser = await prisma.user.findUnique({
        where: {
          id: parseInt(user.id),
        },
      });
      if (databaseUser) {
        await prisma.user.delete({
          where: {
            id: parseInt(user.id),
          },
        });
        const successEmbed = new EmbedBuilder()
          .setTitle("User unwhitelisted.")
          .setColor("Green");
        return interaction.reply({ embeds: [successEmbed] });
      } else {
        const errorEmbed = new EmbedBuilder()
          .setTitle("User doesn't exist.")
          .setColor("Red");
        return interaction.reply({ embeds: [errorEmbed] });
      }
    } else {
      const errorEmbed = new EmbedBuilder()
        .setTitle("Something went wrong.")
        .setColor("Red");
      return interaction.reply({ embeds: [errorEmbed] });
    }
  } catch (err) {
    console.log(err);
    const errorEmbed = new EmbedBuilder()
      .setTitle("Something went wrong.")
      .setColor("Red");
    return interaction.reply({ embeds: [errorEmbed] });
  }
}
