import Mongoose from 'mongoose';
import logger from './app-logger';
import config from './config';

Mongoose.Promise = global.Promise;

const connectToDb = async () => {
  try {
    await Mongoose.connect(`${config.MONGO_URL}`);
    console.info('Connected to mongo!!!');
  } catch (err) {
    console.error('Could not connect to MongoDB');
  }
};

export default connectToDb;
