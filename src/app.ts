import express, {NextFunction, Request, Response} from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

import { appV1Route } from './routes/v1';
import { requestLogger, errorHandler } from './middlewares';
import { RouteNotFoundError } from './utils';
import { HTTP_STATUS } from './constants';

export const app = express();

// set security HTTP headers
app.use(helmet()); // - https://github.com/nestjs/swagger/issues/1006

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

// v1 api routes
app.get('/health', (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).send('ok');
});

app.use('/api/v1', requestLogger, appV1Route);

// send back a 404 error for any unknown api request
app.use('**', requestLogger, (req: Request, res: Response, next: NextFunction) => {
  next(new RouteNotFoundError());
});

// convert error to ApiError, if needed
app.use(errorHandler.convertError);

// handle error
app.use(errorHandler.responseError);
