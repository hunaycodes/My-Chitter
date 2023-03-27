import express from 'express';
import { loginController } from '../controllers/login.controller.js';
import { userValidator } from '../middlewares/login.validation.js';


const router = express.Router();

router.route(`/`)
    .post(userValidator, loginController);

export { router as login }