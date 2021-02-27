var request = require('supertest');

describe('loading express', function () {
    var server;

    beforeEach(function () {
        server = require('../server');
    });

    afterEach(function () {
        server.close();
    });

    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });

    it('responds to /health', function testHealth(done) {
        request(server)
            .get('/health')
            .expect(200, done);
    });

    it('404 everything else', function testWrongPath(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });
});