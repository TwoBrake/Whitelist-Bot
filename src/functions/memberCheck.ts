import { CommandInteraction, GuildMemberRoleManager } from "discord.js";
import config from "../../botConfig.json";

export async function isBotOwner(interaction: CommandInteraction) {
  if (interaction.user.id === "705529912374591930") {
    return true;
  } else {
    return false;
  }
}

export async function hasPerms(interaction: CommandInteraction) {
  if (interaction.member) {
    let runnerRole = (interaction.member.roles as GuildMemberRoleManager).cache;
    if (runnerRole.some((role) => config.whitelistRoles.includes(role.id))) {
      return true;
    } else {
      return false;
    }
  }
}
