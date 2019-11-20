import sqlite from 'sqlite3';
import BaseRecord from '../../../shared/src/records/BaseRecord';
import SelectQueryService from '../../../shared/src/services/SelectQueryService';

export default class RatingRecord extends BaseRecord {
    tableName: string = 'ratings';

    getAverage(db: sqlite.Database, column: string, columnId: string): Promise<AverageRating> {
        return new Promise((resolve, reject) => {
            db.get(new SelectQueryService('ratings')
                .setSelect([column, 'AVG(rating)'])
                .setWhere(`${column} = ${columnId}`)
                .setGroupBy(column)
                .getQuery(),
            (err: Error, result: any) => {
                if(err) return reject(err);
                resolve(result);
            });
        });
    }
}