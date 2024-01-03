import { loadEnvVariables } from './environment';

(async function() {
  await loadEnvVariables();

  // Dynamically loading module so that env should be available for config file
  await import('./server');
})();
