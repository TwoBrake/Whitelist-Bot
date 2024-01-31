# Whitelist Bot
A simple whitelisting system for Discord that utilizes Prisma to store data in databases which can be integrated with other applications you wish to use it with.

## Installation
1. Clone the repository.
2. Run `npm install` to install all dependencies.
3. Make sure you configured the `botConfig.json` to your likings.
4. Make sure to create a `.env` file containing the following:
```env
BOT_TOKEN=
CLIENT_ID=
DATABASE_URL=
```
4. Run `npm run build` to build the project.
5. Run `npm run start` to start the bot.