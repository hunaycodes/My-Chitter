import { check } from 'express-validator';

export const peepValidator = [

    check('username').exists(),
    check('peepContent').exists(),
    check('date').isISO8601()

]

