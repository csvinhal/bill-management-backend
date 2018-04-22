import express from 'express';
import userController from '../controllers/user.controller';

const router = express.Router();

router.get('/', (req, res) => {
  userController.getAll(req, res);
});

router.post('/', (req, res) => {
  userController.add(req, res);
});

router.delete('/:id', (req, res) => {
  userController.delete(req, res);
});

export default router;
