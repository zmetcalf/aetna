import request from 'supertest';
import app from '../../../ratings/src/app';

describe('getAll', () => {
    afterAll(done => {
        app.close(done)
    });

    it('should produce an average for movie', done => {
        request(app)
            .get('/rating?average=movieId&averageId=1')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).toStrictEqual({
                    averageRating: 3.8724696356275303,
                    movieId: 1
                });
                done();
            });
    });

    it('should throw 404 error if not found', done => {
        request(app)
            .get('/rating?average=movieId&averageId=9999999999999999999999')
            .expect('Content-Type', /json/)
            .expect(404)
            .end(done);
    });

    it('should throw 422 error with bad column', done => {
        request(app)
            .get('/rating?average=mov&averageId=9999999999999999999999')
            .expect('Content-Type', /json/)
            .expect(422)
            .then(res => {
                expect(res.body).toBe('mov is not a valid key');
                done();
            });
    });
});