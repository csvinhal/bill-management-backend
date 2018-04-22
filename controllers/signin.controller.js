import jwt from 'jsonwebtoken';
import app from './../app';
import UsersModel from './../models/user.model';
import logger from './../config/app-logger';

const controller = {};

controller.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRes = await UsersModel.findByUserNameAndPassword(email, password);
    
    const token = jwt.sign({ user: userRes }, app.get('superSecret'), {
      expiresIn: 36000, // expires in 24 hours
    });

    logger.info('signin user...');
    res.json({
      success: true,
      message: 'Enjoy your token!',
      token,
    });
  } catch (err) {
    logger.error(`Error in signingup user- ${err}`);
    res.send('Got error in signin');
  }
};

export default controller;
