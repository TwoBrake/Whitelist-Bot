import { CommandInteraction, GuildMemberRoleManager } from "discord.js";
import config from "../botConfig.json";

export default async function roleCheck(interaction: CommandInteraction) {
  if (interaction.member) {
    let runnerRole = (interaction.member.roles as GuildMemberRoleManager).cache;
    if (runnerRole.some((role) => config.whitelistRoles.includes(role.id))) {
      return true;
    } else {
      return false;
    }
  }
}
