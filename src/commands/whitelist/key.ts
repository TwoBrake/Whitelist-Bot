import { CommandInteraction, SlashCommandBuilder, codeBlock } from "discord.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { successEmbed, errorEmbed } from "@functions/embed";

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
      return interaction.reply({
        embeds: [
          await successEmbed(
            "Success",
            `We successfully found your key in our database. Here is your key:\n${codeBlock(
              databaseUser.key
            )}`
          ),
        ],
        ephemeral: true,
      });
    } else {
      return interaction.reply({
        embeds: [await errorEmbed("You are not whitelisted.")],
        ephemeral: true,
      });
    }
  } catch {
    return interaction.reply({
      embeds: [await errorEmbed("Something went wrong!")],
    });
  }
}
