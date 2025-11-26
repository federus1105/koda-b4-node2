import express from 'express';
import { body } from 'express-validator';
import { login, Register } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post(
  '/login', 
  body(['email', 'password'], 'field is mandatory').notEmpty(), 
  body('email', 'invalid email format').isEmail(), 
  login
);

router.post('/register',
  body(['email', 'password'], 'field is mandatory').notEmpty(), 
  body('email', 'invalid email format').isEmail(),  Register);

export default router;