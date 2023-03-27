
import User from '../models/users.model.js';
import { validationResult } from 'express-validator';

export const loginController = async (req, res) => {

    const { username, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.findOne({ username })
        .then(user => {
            if (user && password === user.password) {
                res.send({ message: `Login successful`, user });
            } else {
                res.status(404).send({ message: `Details not found` });
            }
        })
        .catch(err => {
            res.send(err);
        });







}







// router.post('/login', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         // Check if user exists
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         // Check if password matches

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }
//         else {
//             console.log('Login successful')
//         }
//         // Create and sign JWT token
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
//         res.json({ token });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });