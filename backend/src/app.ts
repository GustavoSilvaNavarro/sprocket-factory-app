import 'dotenv/config';
import serverConnection from '@/server/server';

const { app } = serverConnection;

(async function main() {
  try {
    app.listen(app.get('port'), () => {
      console.log(`Express Server 🚀 running on PORT ${app.get('port')} - Worker ${process.pid}`);
    });
  } catch (err) {
    console.error('Unable to connect to database', err);
  }
})();
