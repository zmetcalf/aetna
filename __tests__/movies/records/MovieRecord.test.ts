import MovieRecord from '../../../movies/src/records/MovieRecord';
import sqlite3 from 'sqlite3';
import path from 'path';

const db = new sqlite3.Database(path.join(__dirname, '../../../db/movies.db'));

describe('MovieRecord', () => {
    describe('getById', () => {
        it('should generate a movie result by id', async done => {
            expect(await new MovieRecord(db).getById('2'))
                .toEqual({
                    budget: 0,
                    genres: "[{\"id\": 18, \"name\": \"Drama\"}, {\"id\": 80, \"name\": \"Crime\"}]",
                    imdbId: "tt0094675",
                    language: null,
                    movieId: 2,
                    overview: "Taisto Kasurinen is a Finnish coal miner whose father has just committed suicide and who is framed for a crime he did not commit. In jail, he starts to dream about leaving the country and starting a new life. He escapes from prison but things don't go as planned...",
                    productionCompanies: "[{\"name\": \"Villealfa Filmproduction Oy\", \"id\": 2303}, {\"name\": \"Finnish Film Foundation\", \"id\": 2396}]",
                    releaseDate: "1988-10-21",
                    runtime: 69,
                    title: "Ariel",
                });
            done();
        });
    });
});
