import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import server from '../server.js'
chai.use(chaiHttp)
import testData from './testData/mockPeep.js';

import User from '../src/models/users.model.js';

const testUserData = testData.users


describe(`/Login route tests`, () => {

    const testServer = chai.request(server).keepOpen();

    beforeEach(async () => {
        try {
            await User.deleteMany();
            console.log(`Users collection cleared`);
        } catch (error) {
            console.log(`Error clearing users collection: ${error.message}`);
            throw new Error();
        };

        try {
            await User.insertMany(testUserData);
            console.log(`Database populated with test users`);
        } catch (error) {
            console.log(`Error inserting into user collection: ${error.message}`);
            throw new Error();
        };
    })

    describe(`/Post users`, () => {

        it(`should return login successful if user is found in database`, async () => {

            const userLogin = {
                username: testData.users[0].username,
                password: testData.users[0].password
            }

            const res = await testServer
                .post(`/login`)
                .send(userLogin);

            expect(res.body).to.have.property(`message`, `Login successful`);
        });

    })

})