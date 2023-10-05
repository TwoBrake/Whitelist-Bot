import {
  CommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Returns the help message.");

export async function execute(interaction: CommandInteraction) {
  try {
    const embed = new EmbedBuilder()
      .setTitle("Help")
      .setDescription("This is the help message.")
      .addFields(
        { name: "Help", value: "Returns the help message." },
        {
          name: "Deploy",
          value: "Deploys slash commands to the development server.",
        },
        {
          name: "Whitelist",
          value: "Whitelists a user.",
        },
        {
          name: "Unwhitelist",
          value: "Unwhitelists a user.",
        }
      )
      .setColor("Grey");
    return interaction.reply({ embeds: [embed] });
  } catch (error) {
    console.error(error);
    const errorEmbed = new EmbedBuilder()
      .setTitle("Something went wrong.")
      .setColor("Red");
    return interaction.reply({ embeds: [errorEmbed] });
  }
}
