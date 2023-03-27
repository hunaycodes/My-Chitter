import { validationResult } from 'express-validator';
import User from '../models/users.model.js';


export const signUpController = async (req, res) => {
    const { email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(`Invalid register data`);
    };
    // Stop user registering if email address is already in the database
    User.findOne({ email })
        .then(user => {
            if (user) {
                // Send back that the email address is already used
                res.send({ message: `User already exists` });
            } else {
                const newUser = new User(req.body);
                // Save the new user to the database
                newUser.save()
                    .then(() => {
                        res.send({ message: `Registration successful` });
                    })
                    .catch(err => {
                        res.send(err);
                    });
            }
        })
        .catch(err => {
            res.send(err);
        });


    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(422).send(`Registration failed`);
    // }
    // try {
    //     const todo = await signUpService(req.body);
    //     res.status(201).json({ peep });
    // } catch (error) {
    //     res.status(400).send(`Registration failed`);
    // }
}