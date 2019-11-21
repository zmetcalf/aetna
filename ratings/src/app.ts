import express from 'express';
import bodyParser from "body-parser";
import sqlite3 from 'sqlite3';
import path from 'path';
import ApiService from './services/ApiService';
import errorMiddleware from '../../shared/src/errors/middleware';

const PORT = process.env.NODE_PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use((req: express.Request, res: express.Response, next: Function) => {
    // @ts-ignore
    req.db = new sqlite3.Database(
        path.join(
            __dirname,
            process.env.NODE_ENV === 'test'
                ? '../../db/ratings.db'
                : '../../../db/ratings.db'
        )
    );
    next();
});

app.get('/rating', ApiService.getAll);

app.use(errorMiddleware);

export default app.listen(PORT, () => {
    console.log(`Rating service started on ${process.env.NODE_PORT}`)
});
