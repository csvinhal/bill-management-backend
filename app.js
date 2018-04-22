import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import connectToDb from './config/database-connection';
import logger from './config/app-logger';
import users from './routes/users.route';
import signin from './routes/signin.route';
import signup from './routes/signup.route';
import config from './config/config';

/**
 * The server.
 *
 * @class Server
 */
class Server {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
    connectToDb();
  }

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {Server} Returns the newly created injector for this app.
   */
  static bootstrap() {
    return new Server();
  }

  config() {
    logger.stream = {
      write(message, encoding) {
        logger.info(message);
      }
    };

    this.app.set('superSecret', config.SECRET);
    this.app.set('view engine', 'jade');
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // middleware to use for all requests
    this.app.use((err, req, res, next) => {
      next(createHttpError(404)); // go to the next routes and don't stop here
    });
  }

  /**
   * Configure routes
   *
   * @class Server
   * @method routes
   * @return void
   */
  routes() {
    // get router
    const router = express.Router();

    this.app.use('/signin', signin);
    this.app.use('/signup', signup);

    //
    router.use((req, res, next) => {
      const { token } = req.headers;

      if (token) {
        return jwt.verify(token, req.app.get('superSecret'), (err, decoded) => {
          if (err) {
            return next(createHttpError(401));
          }
          req.decoded = decoded;
          return next();
        });
      }

      return next(createHttpError(403));
    });

    this.app.use('*', router);
    this.app.use('/', router);
    this.app.use('/users', users);
  }
}
const server = Server.bootstrap();
export default server.app;
