import 'dotenv/config';
import serverConnection from '@/server/server';
import { sequelize } from '@/models/connectionDb';

import env from '@/config/env';
// import { addCompanyData } from '@/services/seed';

const { app } = serverConnection;

(async function main() {
  try {
    await sequelize.sync({ force: false });
    console.log(`Connection to ${env.dbDatabaseName} has been established successfully`);

    // await addCompanyData();

    app.listen(app.get('port'), () => {
      console.log(`Express Server 🚀 running on PORT ${app.get('port')} - Worker ${process.pid}`);
    });
  } catch (err) {
    console.error('Unable to connect to database', err);
  }
})();
