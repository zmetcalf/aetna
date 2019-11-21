import sqlite3 from 'sqlite3';
import BaseRecord from '../../../shared/src/records/BaseRecord';
import SelectQueryService from '../../../shared/src/services/SelectQueryService';

export default class RatingRecord extends BaseRecord {
    tableName: string = 'ratings';
    db: sqlite3.Database;

    constructor(db: sqlite3.Database) {
        super();
        this.db = db;
    }

    getAverage(column: string, columnId: string): Promise<AverageRating> {
        return new Promise((resolve, reject) => {
            this.db.get(new SelectQueryService(this.tableName)
                .setSelect([column, 'AVG(rating)'])
                .setWhere(`${column} = ${columnId}`)
                .getQuery(),
            (err: Error, result: any) => {
                if(err) return reject(err);
                resolve(result);
            });
        });
    }
}