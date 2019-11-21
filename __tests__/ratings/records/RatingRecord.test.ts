import RatingRecord from '../../../ratings/src/records/RatingRecord';
import sqlite3 from 'sqlite3';
import path from 'path';

const db = new sqlite3.Database(path.join(__dirname, '../../../db/ratings.db'));

describe('RatingRecord', () => {
    it('should generate a rating result', async done => {
        expect(await new RatingRecord(db).getAverage('movieId', '1'))
            .toEqual({
                "AVG(rating)": 3.8724696356275303,
                movieId: 1
            });
        done();
    });
});