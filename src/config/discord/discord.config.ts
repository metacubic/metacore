import { INestApplication } from '@nestjs/common';
import * as process from 'process';
const { Client, GatewayIntentBits } = require('discord.js');

export function setupDiscord(app: INestApplication) {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });
  const config = {
    token: process.env.DISCORD_TOKEN,
    prefix: process.env.DISCORD_PREFIX,
  };

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on('message', (msg) => {
    if (msg.content === 'ping') {
      msg.reply('Pong!');
    }
  });

  client.login(config.token);
}
