import {
  CommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  codeBlock,
} from "discord.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { hasPerms, isBotOwner } from "@functions/memberCheck";
import print from "@functions/print";
import { successEmbed, errorEmbed } from "@functions/embed";

export const data = new SlashCommandBuilder()
  .setName("check")
  .setDescription("Checks if a user is whitelisted or not.")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("The user to get whitelist information from.")
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
  try {
    if (await hasPerms(interaction)) {
      const user = interaction.options.getUser("user");
      if (user) {
        const userDB = await prisma.user.findUnique({
          where: {
            id: parseInt(user.id),
          },
        });
        if (userDB) {
          return interaction.reply({
            embeds: [
              await successEmbed(
                `Success`,
                `${user} is whitelisted! The key found in our database for this user is: \n${codeBlock(
                  userDB.key
                )}`
              ),
            ],
            ephemeral: true,
          });
        } else {
          return interaction.reply({
            embeds: [
              await errorEmbed(
                "This user is not whitelisted or is not in our database."
              ),
            ],
          });
        }
      } else {
        return interaction.reply({
          embeds: [await errorEmbed("Something went wrong!")],
        });
      }
    } else {
      return interaction.reply({
        embeds: [
          await errorEmbed("You don't have permission to use this command!"),
        ],
      });
    }
  } catch {
    return interaction.reply({
      embeds: [await errorEmbed("Something went wrong!")],
    });
  }
}
