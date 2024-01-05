import { app } from './app';
import { config, database, logger } from './config';
import { appHelper } from './helpers';
import { errorHandler } from './middlewares/error-handler';
import { fileSystem } from './utils';


database.authenticate().then(() => {
  logger.info('Database Connected');

  app.listen(config.SERVER.PORT, () => {
    logger.info(`Started listening to: ${config.SERVER.URL}`);
  });  
}).catch((err) => {
  logger.error('Unable to connect to the db:', err);
})

const handleServerClose = async function() {
  const deletedFilesCount = await fileSystem.deleteFilesWithPatternSync('./', '-audit.json') || '0';
  await appHelper.sleep(parseInt(deletedFilesCount?.toString(), 10));
}

process.stdin.resume(); // so the program will not close instantly

// Handling Server Error
['SIGQUIT', 'SIGTERM', 'SIGINT', 'SIGUSR1', 'SIGUSR2'].forEach((type) => {
  process.on(type, async function(type) {
    errorHandler.logServerError(type);

    await handleServerClose();
    process.exit();
  });
});

process.on('exit', async () => {
  logger.info('Server closed');
  process.exit();
});

process.on('uncaughtException', (error) => errorHandler.logServerError('uncaughtException', error));
process.on('unhandledRejection', (error: Error) => errorHandler.logServerError('unhandledRejection', error));
