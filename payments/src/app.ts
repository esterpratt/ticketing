import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@epticket/common';
import { CreateChargeRouter } from './routes/new';

const app = express();
// our traffic is been proxied through nginx.
// Because it is proxy, express will not trust the https connection.
// This will tell express to trust the traffic.
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // when in test, we want to return the cookie even if the http request is not secured
    secure: false,
  })
);
app.use(currentUser);
app.use(CreateChargeRouter);

// catch errors of trying to get to not existing router
app.all('*', async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
