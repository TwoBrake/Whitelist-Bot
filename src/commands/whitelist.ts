import {
  CommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const data = new SlashCommandBuilder()
  .setName("whitelist")
  .setDescription("Whitelists a user.")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("The user to whitelist.")
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
      if (!databaseUser) {
        console.log(parseInt(user.id));
        await prisma.user.create({
          data: {
            id: parseInt(user.id),
            key: "whitelisted",
          },
        });
        console.log("created user");
        const successEmbed = new EmbedBuilder()
          .setTitle("User whitelisted.")
          .setColor("Green");
        return interaction.reply({ embeds: [successEmbed] });
      } else {
        const errorEmbed = new EmbedBuilder()
          .setTitle("User already exists.")
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
    console.error(err);
    const errorEmbed = new EmbedBuilder()
      .setTitle("Something went wrong.")
      .setColor("Red");
    return interaction.reply({ embeds: [errorEmbed] });
  }
}
