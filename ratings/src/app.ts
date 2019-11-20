import express from 'express';
import bodyParser from "body-parser";
import sqlite3 from 'sqlite3';
import path from 'path';
import ApiService from './services/ApiService';
import errorMiddleware from '../../shared/src/errors/middleware';

const app = express();

app.use(bodyParser.json());
app.use((req: express.Request, res: express.Response, next: Function) => {
    // @ts-ignore
    req.db = new sqlite3.Database(path.join(__dirname, '../../db/ratings.sql'));
    next();
});

app.get('/rating', ApiService.getAll);

app.use(errorMiddleware);

export default app.listen(process.env.NODE_PORT, () => {
    console.log(`Rating service started on ${process.env.NODE_PORT}`)
});
