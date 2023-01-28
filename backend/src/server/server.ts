import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app: Application = express();

app.set('port', process.env.PORT || 8080);

app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use(morgan('dev'));

export default { app };
