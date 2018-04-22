import express from 'express';
import signinController from './../controllers/signin.controller';

const router = express.Router();

router.post('/', (req, res) => {
  signinController.signin(req, res);
});

export default router;
