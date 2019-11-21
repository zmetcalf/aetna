import BaseError from './BaseError';

export default class BadRequest extends BaseError {
    status: number = 400;

    constructor(message: string) {
        super(message);
    }
}