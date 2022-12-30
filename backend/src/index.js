import mongo from "./mongo.js";
import httpServer from "./server.js";

import "dotenv-defaults/config.js";
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();
app.use(cors());
app.use(express.json());

mongo.connect();
const database = mongoose.connection;

app.use('/', routes);
const port = process.env.PORT | 4000;
const port2 = process.env.PORT | 4001;

app.listen(port2, () => {
  console.log(`App Server is up on port ${port2}!`)
})

httpServer.listen({ port }, () => {
  console.log(`The server is up on port ${port}!`);
});
