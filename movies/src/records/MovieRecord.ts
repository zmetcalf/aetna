import sqlite3 from 'sqlite3';
import BaseRecord from '../../../shared/src/records/BaseRecord';
import SelectQueryService from '../../../shared/src/services/SelectQueryService';
import UnprocessableEntity from '../../../shared/src/errors/UnprocessableEntity';

export default class MovieRecord extends BaseRecord {
    tableName: string = 'movies';
    db: sqlite3.Database;

    constructor(db: sqlite3.Database) {
        super();
        this.db = db;
    }

    getById(id: string): Promise<Movie> {
        return new Promise((resolve, reject) => {
            const q = new SelectQueryService(this.tableName)
                .setSelect([
                    'movieId',
                    'imdbId',
                    'title',
                    'overview',
                    'productionCompanies',
                    'releaseDate',
                    'budget',
                    'runtime',
                    'language',
                    'genres',
                ])
                .setWhere(`movieId = ${id}`)
                .getQuery();
            this.db.get(q,
            (err: Error, result: any) => {
                if(err && /SQLITE_ERROR/.test(err.message))
                    return reject(new UnprocessableEntity(
                        'Unable to complete the query'
                    ));

                if(err) return reject(err);
                resolve(result);
            });
        });
    }
}