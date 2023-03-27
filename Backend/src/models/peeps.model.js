import mongoose from 'mongoose';

const peepSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true

    },

    peepContent: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,


    }

});

const Peep = mongoose.model(`Peep`, peepSchema);

export default Peep;