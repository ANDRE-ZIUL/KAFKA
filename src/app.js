import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import MessageController from './controllers/MessageController';
import messageRoutes from './routes/messageRoutes';
dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    MessageController.connectConsumer();
    MessageController.connectProducer();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use('/messages/', messageRoutes);
  }
}

export default new App().app;