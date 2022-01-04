import dotenv from 'dotenv';

// Calling before loading the configurations to load the environment first.
const ENVIRONMENT = process.env.NODE_ENV || 'local'; // https://stackoverflow.com/questions/11104028/why-is-process-env-node-env-undefined
dotenv.config({ path: `.env.${ENVIRONMENT}` });
console.log(`Loaded Environment Variables from '.env.${ENVIRONMENT}'`);

// Configs
import appConfig from './app.config';
import discordConfig from './discord.config';
import debugConfig from './debug.config';
import ormConfig from './orm.config';

export const config = {
  app: appConfig,
  discord: discordConfig,
  debug: debugConfig,
  orm: ormConfig,
};

export default config;
