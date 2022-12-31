import { INestApplication } from '@nestjs/common';
// Just some fancy stuff, for reading pleasure of the console
const chalk = require('chalk');

export function setupConsole(app: INestApplication) {
  // ----| [ .env[GLOBAL ENVIRONMENTS].production ] |----
  const globalUrl = process.env.GLOBAL_URL;
  const frontendUrl = process.env.FRONTEND_URL;
  // ----| [ .env[GLOBAL ENVIRONMENTS].development ] |----
  const globalUrlDev = process.env.GLOBAL_URL_DEV;
  const frontendUrlDev = process.env.FRONTEND_URL_DEV;
  // ----| [ .env[GLOBAL ENVIRONMENTS].test ] |----
  const port = process.env.GLOBAL_PORT || 3001;
  const p2pPort = process.env.P2P_PORT || 6001;

  // ----| [ CONSOLE LOGGING [Always On] ] |----
  console.log(chalk.hex('#45ff00').bold(`---| [server] Global Prefix:`));
  console.log(chalk.hex('#FF3C00').bold(`---| [server] Port: ${port}`));
  console.log(chalk.hex('#FF3C00').bold(`---| [server] P2P Port: ${p2pPort}`));
  // ----| [ CONSOLE LOGGING [Environment Dependent] ] |----
  if (process.env.NODE_ENV == 'development') {
    console.log(
      chalk
        .hex('#ffdd00')
        .bold(`---| [server] Global URL: ${globalUrlDev}:${port}`),
    );
    console.log(
      chalk
        .hex('#ffdd00')
        .bold(`---| [server] Frontend URL: ${frontendUrlDev}`),
    );
    console.log(
      chalk.hex('#ffdd00').bold(`---| [swagger] Swagger Config Loaded`),
    );
    console.log(
      chalk
        .hex('#ffdd00')
        .bold(`---| [swagger] Global URL: ${globalUrlDev}:${port}/v1`),
    );
  } else {
    console.log(
      chalk.hex('#45ff00').bold(`---| [server] Global URL: ${globalUrl}`),
    );
    console.log(
      chalk.hex('#45ff00').bold(`---| [server] Frontend URL: ${frontendUrl}`),
    );
    console.log(
      chalk.hex('#45ff00').bold(`---| [swagger] Swagger Config Loaded`),
    );
    console.log(
      chalk.hex('#45ff00').bold(`---| [swagger] Global URL: ${globalUrl}/v1`),
    );
  }
}
