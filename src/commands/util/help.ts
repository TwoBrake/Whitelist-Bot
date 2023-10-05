import config from "../../../botConfig.json";
import {
  CommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  ColorResolvable,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Returns the help message.");

export async function execute(interaction: CommandInteraction) {
  try {
    const embed = new EmbedBuilder()
      .setTitle("Help")
      .setDescription("Here is a list of the commands you can use:")
      .addFields(
        {
          name: "</help:1159265951691309197>",
          value: "Returns the help message.",
        },
        {
          name: "</deploy:1159265951691309198>",
          value: "Deploys slash commands to the development server.",
        },
        {
          name: "</whitelist:1159270661722755143>",
          value: "Whitelists a user.",
        },
        {
          name: "</unwhitelist:1159278006813073490>",
          value: "Unwhitelists a user.",
        },
        {
          name: "</key:1159306411969355958>",
          value: "Returns your key.",
        },
        {
          name: "</check:1159621176717475870>",
          value: "Checks if a user is whitelisted or not.",
        }
      )
      .setColor(config.themeColor as ColorResolvable);
    return interaction.reply({ embeds: [embed] });
  } catch (error) {
    console.error(error);
    const errorEmbed = new EmbedBuilder()
      .setTitle("Something went wrong.")
      .setColor("Red");
    return interaction.reply({ embeds: [errorEmbed] });
  }
}
