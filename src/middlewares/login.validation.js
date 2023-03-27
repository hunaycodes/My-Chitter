import { check } from 'express-validator';

export const userValidator = [

    check('username').exists(),
    check('password').exists(),

]