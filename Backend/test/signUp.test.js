
import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import server from '../server.js'
chai.use(chaiHttp)
import testData from './testData/mockPeep.js';

import User from '../src/models/users.model.js';

const testUserData = testData.users



describe(`/Register route tests`, () => {

    const testServer = chai.request(server).keepOpen();

    beforeEach(async () => {

        try {
            await User.deleteMany();
            console.log(`User collection cleared`);
        } catch (error) {
            console.log(`Error clearing user collection: ${error.message}`);
            throw new Error();
        };

        try {
            await User.insertMany(testUserData);
            console.log(`Database populated with test users`);
        } catch (error) {
            console.log(`Error inserting into user collection: ${error.message}`);
            throw new Error();
        };

    });

    describe(`/register users`, () => {

        const mockUser = {
            username: "maame",
            email: "",
            password: "password1234"
        }

        it(`should not register a user if any input field is missing`, async () => {

            const res = await testServer
                .post(`/register`)
                .send(mockUser);

            expect(res).to.have.status(422);
            expect(res.text).to.be.eql(`Invalid register data`)
        });

        it(`should sign up a new user if all field are inputed properly`, async () => {
            const mockUser = {
                username: "testUser4",
                email: "honey.anim@email.com",
                password: "passwordabena"
            }

            const res = await testServer
                .post('/register')
                .send(mockUser);

            expect(res.body).to.have.property(`message`, `Registration successful`)
        })

        it(`should not add existing users`, async () => {

            const res = await testServer
                .post(`/register`)
                .send(testUserData[0]);

            expect(res.body).to.have.property(`message`, `User already exists`)
        })
    })
});