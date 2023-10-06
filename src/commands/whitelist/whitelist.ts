import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { hasPerms } from "@functions/memberCheck";
import { successEmbed, errorEmbed } from "@functions/embed";
import print from "@functions/print";

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
    //* Check if both users exists.
    if (user && interaction.member) {
      //* Check if the member running the command has the correct role.
      if (await hasPerms(interaction)) {
        //* Define the database user variable for later use.
        const databaseUser = await prisma.user.findUnique({
          where: {
            id: parseInt(user.id),
          },
        });
        //* Check if the user exists in the database.
        if (!databaseUser) {
          print("info", `Whitelisting user ID: ${user.id}`);
          await prisma.user.create({
            data: {
              id: parseInt(user.id),
              key: generateKey(20),
            },
          });
          print("success", `Whitelisted ${user.tag}`);
          return interaction.reply({
            embeds: [
              await successEmbed(
                "Success",
                `${user} has been whitelisted successfully! They can now be found in our database.`
              ),
            ],
          });
        } else {
          return interaction.reply({
            embeds: [
              await errorEmbed(
                "Something went wrong!",
                `${user} already exists in our database.`
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
    }
  } catch (err) {
    console.error(err);
    return interaction.reply({
      embeds: [await errorEmbed("Something went wrong!")],
    });
  }
}

function generateKey(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
