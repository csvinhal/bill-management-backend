import UsersModel from './../models/user.model';
import logger from './../config/app-logger';

const controller = {};

controller.getAll = async (req, res) => {
  try {
    const users = await UsersModel.getAll();
    logger.info('sending all users...');
    res.send(users);
  } catch (err) {
    logger.error('Error in getting users- ' + err);
    res.send('Got error in getAll');
  }
};

controller.add = async (req, res) => {
  let userToAdd = UsersModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });
  try {
    const savedUser = await UsersModel.add(userToAdd);
    logger.info('Adding user...');
    res.send('added: ' + savedUser);
  } catch (err) {
    logger.error('Error in adding user- ' + err);
    res.send('Got error in getAll');
  }
};

controller.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const removedUser = await UsersModel.findByIdAndRemove(id);
    logger.info('Deleted User- ' + removedUser);
    res.send('User successfully deleted');
  } catch (err) {
    logger.error('Failed to delete user- ' + err);
    res.send('Delete failed..!');
  }
};

export default controller;
