import express from 'express';
import BaseError from './BaseError';

const middleware = (err: Error, req: express.Request, res: express.Response, next: Function) => {
    if(process.env.NODE_ENV !== 'test') console.error(err.stack);
    if(err instanceof BaseError)
        return res.status(err.status).json(err.message);
    return res.status(500).json(err.message);
};

export default middleware;