import express from 'express';
import bodyParser from "body-parser";
import sqlite3 from 'sqlite3';
import path from 'path';
import controller from './controller';
import errorMiddleware from '../../shared/src/errors/middleware';

const PORT = process.env.NODE_PORT || 3001;

const app = express();
const db = new sqlite3.Database(
    path.join(
        __dirname,
        process.env.NODE_ENV === 'test'
            ? '../../db/movies.db'
            : '../../../db/movies.db'
    )
);

app.use(bodyParser.json());
app.use((req: express.Request, res: express.Response, next: Function) => {
    // @ts-ignore
    req.db = db;
    next();
});

app.get('/movie/:id', controller.getOne);

app.use(errorMiddleware);

export default app.listen(PORT, () => {
    console.log(`Rating service started on ${PORT}`)
});
