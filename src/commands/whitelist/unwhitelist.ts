import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { PrismaClient } from "@prisma/client";
import { hasPerms } from "@functions/memberCheck";
import { successEmbed, errorEmbed } from "@functions/embed";
import print from "@functions/print";
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
          return interaction.reply({
            embeds: [
              await successEmbed(
                "Success",
                `${user} has been unwhitelisted successfully! They have now been removed from our database.`
              ),
            ],
          });
        } else {
          return interaction.reply({
            embeds: [
              await errorEmbed(
                "Something went wrong!",
                `We couldn't find ${user} in our database.`
              ),
            ],
          });
        }
      } else {
        return interaction.reply({
          embeds: [
            await errorEmbed("You don't have permission to run this command."),
          ],
        });
      }
    } else {
      return interaction.reply({
        embeds: [await errorEmbed("Something went wrong!")],
      });
    }
  } catch (err) {
    print("error", err);
    return interaction.reply({
      embeds: [await errorEmbed("Something went wrong!")],
    });
  }
}
