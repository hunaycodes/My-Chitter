import express from 'express';
import { addPeepController } from '../controllers/addPeep.controller.js';
import { peepValidator } from '../middlewares/peeps.validation.js';

const router = express.Router();

router.route(`/`)
    .post(peepValidator, addPeepController)


export { router as addPeep }; 