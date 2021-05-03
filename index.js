import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
global.app = app;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.locals.appExpress = app;

const port = process.env.PORT || 5000;
app.listen(port);
//
// eslint-disable-next-line no-console
console.log(`App is listening on port ${port}`);

// eslint-disable-next-line no-console
app.listen(8080, () => console.log('Running on host'));
