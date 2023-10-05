import chalk from "chalk";

export default async function print(
  level: "info" | "success" | "error",
  message: string | unknown
) {
  switch (level) {
    case "info":
      console.log("[WB] " + chalk.blueBright(message));
      break;
    case "success":
      console.log("[WB] " + chalk.greenBright(message));
      break;
    case "error":
      console.log("[WB] " + chalk.redBright(message));
      break;
  }
}
