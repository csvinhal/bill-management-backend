import UsersModel from './../models/user.model';
import logger from './../config/app-logger';

const controller = {};

controller.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UsersModel.findByUserNameAndPassword(email, password);
    logger.info('Signup user...');
    res.send(`signup: ${user}`);
  } catch (err) {
    logger.error(`Error in signingup user- ${err}`);
    res.send('Got error in signup');
  }
};

export default controller;
