/* eslint-disable no-console */
import dotenv from 'dotenv';
import path from 'path';

export async function loadEnvVariables() {
  dotenv.config({ path: path.join(__dirname, `../.env`) });
}
