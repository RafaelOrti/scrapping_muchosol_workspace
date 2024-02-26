import express, { Application } from 'express';
import compression from 'compression';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler';
import { dbConnection } from './database';
import { NODE_ENV, PORT, LOG_FORMAT } from './config';
import { logger, stream } from './utils/logger';
import { EventRoute } from './routes/event';
import { swaggerSpecs } from './config/swaggerConfig';

export class App {
  public app: Application;
  public env: string;
  public readonly port: string | number;

  constructor() {
    this.app = express();
    this.port = PORT || 3000;
    this.env = NODE_ENV || 'development';

    this.connectToDatabase();
    this.configureMiddlewares();
    this.configureRoutes();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info('=================================================');
      logger.info('=================================================');
      logger.info(`============ ENVIRONMENT: ${this.env} ============`);
      logger.info(`===== Server is now listening on port: ${this.port} =====`);
      logger.info('=================================================');
      logger.info('=================================================');
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    await dbConnection();
  }

  private configureMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
    this.app.use(errorHandler);
  }

  private configureRoutes(): void {
    const eventRoute = new EventRoute();
    this.app.use('/', eventRoute.router);
  }
}
