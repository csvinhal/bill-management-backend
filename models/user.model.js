import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

UserSchema.plugin(uniqueValidator);

const UsersModel = mongoose.model('User', UserSchema);

UsersModel.getAll = () => {
  return UsersModel.find({});
};

UsersModel.add = userToAdd => {
  return userToAdd.save();
};

UsersModel.remove = userName => {
  return UsersModel.remove({ name: userName });
};

export default UsersModel;
