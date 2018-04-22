import userController from './user.controller';
import logger from './../config/app-logger';

const controller = {};

controller.signin = async (req, res) => {
  try {
    userController.add(req, res);
    logger.info('Signup user...');
  } catch (err) {
    logger.error(`Error in signingin user- ${err}`);
    res.send('Got error in signin');
  }
};

export default controller;
