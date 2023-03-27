import Peep from '../models/peeps.model.js';

export const addPeepService = async peep => {
    try {
        const newPeep = new Peep(peep);
        return await newPeep.save();
    }
    catch (e) {
        throw e;
    }
}

export const getPeepService = async () => {
    try {
        return await Peep.find({});
    }
    catch (e) {
        throw e;
    }
}