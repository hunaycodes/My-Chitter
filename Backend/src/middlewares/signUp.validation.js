import { check } from 'express-validator';

export const newUserValidator = [

    check('username').exists().isLength({ min: 2 }),
    check('password').exists().isLength({ min: 8 }),
    check('email').exists().isEmail()

]