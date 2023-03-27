import express from 'express';

const router = express.Router();

router.post('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log(error);
        } else {
            // Redirect the user to the login page
            res.status(200).send('Logout successful');
        }
    });
});

export { router as logout };
