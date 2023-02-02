import 'dotenv/config';
import serverConnection from '@/server/server';
import { sequelize } from '@/models/connectionDb';
import { logger } from '@/utils/loggers';

import env from '@/config/env';

const { app } = serverConnection;

(async function main() {
  try {
    await sequelize.sync({ force: false });
    logger.info(`Connection to ${env.dbDatabaseName} has been established successfully`);

    app.listen(app.get('port'), () => {
      logger.info(`Express Server 🚀 running on PORT ${app.get('port')}`);
    });
  } catch (err) {
    console.error('Unable to connect to database', err);
  }
})();
