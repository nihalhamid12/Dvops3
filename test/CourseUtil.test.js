const { describe, it } = require('mocha');
const { expect } = require('chai');

const { app, server } = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let baseUrl;

describe('Course API', () => {

    before(async () => {
        const { address, port } = await server.address();
        baseUrl = `http://${address == '::' ? 'localhost' : address}:${port}`;
    });

    after(() => {
        return new Promise((resolve) => {
            server.close(() => {
                resolve();
            });
        });
    });

    let count = 0;
    let resourceId; // Variable to store the ID of the resource

    // Test Suite for adding resources
    describe('POST /add-course', () => {
        it('should return 500 for validation errors', (done) => {
            chai.request(baseUrl)
                .post('/add-course')
                .send({
                    name: 'Test Course',
                    code: 'Test Code'
                })
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    expect(res.body.message).to.equal('Validation error: Course code must be exactly 3 digits');
                    done();
                });
        });

        it('should add a new course', (done) => {
            chai.request(baseUrl)
                .post('/add-course')
                .send({
                    name: 'Test Course',
                    code: '123' // Use a valid 3-digit numeric course code
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(count + 1);
                    //resourceId = res.body[res.body.length - 1].id; // Store the ID of the newly added resource
                    done();
                });
        });

    });



});