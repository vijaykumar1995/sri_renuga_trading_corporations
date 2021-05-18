/* eslint-disable comma-dangle */
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import categories from './routes/categories';
import employee from './routes/employee';
import products from './routes/product';
import purchaseCompany from './routes/purchase_company';
import weight from './routes/weight';

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

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.locals.appExpress = app;

app.use('/api/categories', categories);
app.use('/api/employee', employee);
app.use('/api/products', products);
app.use('/api/purchase_company', purchaseCompany);
app.use('/api/weight', weight);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
const server = app.listen(port);
//
// eslint-disable-next-line no-console
console.log(`App is listening on port ${port}`);

// eslint-disable-next-line no-console
app.listen(8080, () => console.log('Running on host'));
