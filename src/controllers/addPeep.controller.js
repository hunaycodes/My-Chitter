import { addPeepService } from '../services/peeps.service.js';
import { validationResult } from 'express-validator';

export const addPeepController = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const peep = await addPeepService(req.body);
        res.status(201).json({ message: 'Peep added successfully', peep });

    } catch (error) {
        res.status(400).send(`Adding new peep failed: ${error.message}`);
    }
}

