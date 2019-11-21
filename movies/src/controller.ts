import express = require('express');

import { asyncMiddleware } from '../../shared/src/utils';
import GetOneService from "./services/GetOneService";

export default {
    getOne: asyncMiddleware(async (req: express.Request, res: express.Response) =>
        res.json(
// @ts-ignore
            (await (await new GetOneService(req.db, req.params.id)
                .getRecord())
                .getRating()).setDollarsOnBudget().getResult()
        )
    ),
};