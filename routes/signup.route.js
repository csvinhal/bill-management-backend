import express from 'express';
import signupController from './../controllers/signup.controller';

const router = express.Router();

router.post('/', (req, res) => {
  signupController.signup(req, res);
});

export default router;
