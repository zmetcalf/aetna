import express = require('express');
import { asyncMiddleware } from '../../../shared/src/utils';
import RatingRecord from '../records/RatingRecord';

export default {
    getAll: asyncMiddleware(async (req: express.Request, res: express.Response) => {
        if(req.query.average) {
            // TODO Add error handling
            const result: AverageRating = await (new RatingRecord())
                // @ts-ignore
                .getAverage(req.db, req.query.average, req.query.averageId);
            return res.json({
                averageRating: result['AVG(rating)'],
                movieId: result.movieId,
            });
        }
        // TODO Add basic handling
        return res.json([]);
    }),
};