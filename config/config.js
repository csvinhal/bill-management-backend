import path from 'path';

const config = {};

const MONGO_SERVER = '127.0.0.1';
const SERVER_PORT = '27017';
const DATABASE = 'bills';
config.MONGO_URL = `mongodb://${MONGO_SERVER}:${SERVER_PORT}/${DATABASE}`;
config.SECRET = 'secretbillmanagement';
config.logFileDir = path.join(__dirname, '../../log');
config.logFileName = 'app.log';

export default config;
