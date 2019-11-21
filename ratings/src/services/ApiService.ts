import express = require('express');

import { asyncMiddleware } from '../../../shared/src/utils';
import NotFound from "../../../shared/src/errors/NotFound";
import UnprocessableEntity from "../../../shared/src/errors/UnprocessableEntity";

import { FOREIGN_KEY_COLUMNS } from "../constants";
import RatingRecord from '../records/RatingRecord';

export default {
    getAll: asyncMiddleware(async (req: express.Request, res: express.Response) => {
        if(req.query.average) {
            if(!req.query.averageId)
                throw new UnprocessableEntity('averageId is required with average query param');

            if(!FOREIGN_KEY_COLUMNS.find(
                (key: string) => key === req.query.average))
                throw new UnprocessableEntity(`${req.query.average} is not a valid key`)

            // @ts-ignore
            const result: any = await (new RatingRecord(req.db))
                .getAverage(req.query.average, req.query.averageId);

            if(!result[req.query.average])
                throw new NotFound(`${req.query.averageId} was not found.`);

            const response: any  = {
                averageRating: result['AVG(rating)'],
            };

            response[req.query.average] = result[req.query.average];

            return res.json(response);
        }

        // TODO Add list handling
        return res.json([]);
    }),
};