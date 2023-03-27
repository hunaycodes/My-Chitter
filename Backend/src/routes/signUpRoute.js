import express from 'express';
import { signUpController } from '../controllers/signUp.controller.js';
import { newUserValidator } from '../middlewares/signUp.validation.js';

const router = express.Router();

router.route(`/`)
    .post(newUserValidator, signUpController)

export { router as signUp }; 