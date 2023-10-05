import { ColorResolvable, EmbedBuilder } from "discord.js";
import botConfig from "../../botConfig.json";

export async function infoEmbed(title: string, desc?: string) {
  if (desc) {
    return new EmbedBuilder()
      .setTitle(title)
      .setDescription(desc)
      .setColor(botConfig.themeColor as ColorResolvable);
  } else {
    return new EmbedBuilder()
      .setTitle(title)
      .setColor(botConfig.themeColor as ColorResolvable);
  }
}

export async function successEmbed(title: string, desc?: string) {
  if (desc) {
    return new EmbedBuilder()
      .setTitle(title)
      .setDescription(desc)
      .setColor(botConfig.successColor as ColorResolvable);
  } else {
    return new EmbedBuilder()
      .setTitle(title)
      .setColor(botConfig.successColor as ColorResolvable);
  }
}

export async function errorEmbed(title: string, desc?: string) {
  if (desc) {
    return new EmbedBuilder()
      .setTitle(title)
      .setDescription(desc)
      .setColor(botConfig.errorColor as ColorResolvable);
  } else {
    return new EmbedBuilder()
      .setTitle(title)
      .setColor(botConfig.errorColor as ColorResolvable);
  }
}
