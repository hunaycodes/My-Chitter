import Peep from '../src/models/peeps.model.js';

import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';
import testData from './testData/mockPeep.js';
const testDataArray = testData.peeps;

chai.use(chaiHttp);

describe(`Testing requests on the database`, () => {
    const testServer = chai.request(server).keepOpen();
    beforeEach(async () => {
        try {
            await Peep.deleteMany();
            console.log(`Database cleared`);
        } catch (error) {
            console.log(`Error clearing`);
            throw new Error();
        };
        try {
            await Peep.insertMany(testDataArray);
            console.log(`Database populated with test peeps`);
        } catch (error) {
            console.log(`Error inserting`);
            // Terminate the test
            throw new Error();
        };
    });



    describe(`all peeps`, () => {

        it(`should return all of the peeps as an array`, async () => {
            const res = await testServer
                .get(`/`)
                .send();

            expect(res).to.have.status(200);
            expect(res.body).to.be.an(`array`);
            expect(res.body.length).to.equal(testDataArray.length);
        });
    });

    describe(`/post peeps`, () => {

        it(`should create a new peep that is properly formed`, async () => {
            const newPeep = {
                username: "testerHoney",
                peepContent: "I am a test peep",
                date: new Date().toISOString()
            }

            const res = await testServer
                .post(`/post`)
                .send(newPeep);

            expect(res).to.have.status(201);
            expect(res.body).to.be.an(`object`);
        })
    })

})