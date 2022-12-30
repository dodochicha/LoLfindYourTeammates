import mongo from "./mongo.js";
import httpServer from "./server.js";

import "dotenv-defaults/config.js";
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());


mongo.connect();
const database = mongoose.connection;

app.use('/', routes);
const port = process.env.PORT | 4000;

app.listen(port, () => {
  console.log(`App Server is up on port ${port}.`)
})

httpServer.listen({ port }, () => {
  console.log(`The server is up on port ${port}!`);
});
