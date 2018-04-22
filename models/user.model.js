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

UsersModel.getAll = () => UsersModel.find({});

UsersModel.add = userToAdd => userToAdd.save();

UsersModel.remove = userName => UsersModel.remove({ name: userName });

UsersModel.findByUserNameAndPassword = (username, pass) =>
  UsersModel.findOne({ email: username, password: pass });

export default UsersModel;
