import userController from './user.controller';
import logger from './../config/app-logger';

const controller = {};

controller.signup = async (req, res) => {
  try {
    userController.add(req, res);
    logger.info('Signup user...');
  } catch (err) {
    logger.error(`Error in signup user- ${err}`);
    res.send('Got error in signup');
  }
};

export default controller;
