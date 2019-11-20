import RatingRecord from '../../../ratings/src/records/RatingRecord';

describe('RatingRecord', () => {
    it('should generate a rating reslut', async done => {
        expect(await new RatingRecord().getAverage('movieId', '1'))
            .toEqual({
                "AVG(rating)": 3.8724696356275303,
                movieId: 1
            });
        done();
    });
});