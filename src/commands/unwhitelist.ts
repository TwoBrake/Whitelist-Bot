import {
  CommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  GuildMemberRoleManager,
} from "discord.js";
import { PrismaClient } from "@prisma/client";
import config from "../../botConfig.json";
import { hasPerms, isBotOwner } from "../memberCheck";
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
    //* Check if both users exists.
    if (user && interaction.member) {
      //* Check if the member running the command has the correct role.
      if (await hasPerms(interaction)) {
        const databaseUser = await prisma.user.findUnique({
          where: {
            id: parseInt(user.id),
          },
        });
        //* Check if the user exists in the database.
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
          .setTitle("You don't have permission to run this command.")
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
