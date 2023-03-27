import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV}` });

//import routes
import { addPeep } from "./src/routes/peepsRoute.js";
import { allPeeps } from "./src/routes/allPeepsRoute.js";
import { login } from "./src/routes/loginRoute.js";
import { signUp } from "./src/routes/signUpRoute.js";

import { logout } from "./src/routes/logoutRoute.js";



const port = process.env.PORT;
const host = process.env.HOST;
const app = express();

const main = async () => {
    //console.log(`Connecting to DB @ ${process.env.DB_URI}`);
    await mongoose.connect(process.env.DB_URI);
    console.log(`Connected to DB @ ${process.env.DB_URI}`);
}

main().catch(err => console.log(err))


//add all routes
app.use(express.json());
app.use(cors());
app.use('/post', addPeep)
app.use('/', allPeeps)
app.use('/login', login)
app.use('/register', signUp)
app.use('/logout', logout)

const server = app.listen(port, host, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;
    console.log(`Server is running on http://${SERVERHOST}:${SERVERPORT}`);
});

export default server;