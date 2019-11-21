import BaseError from './BaseError';

export default class NotFound extends BaseError {
    status: number = 404;

    constructor(message: string) {
        super(message);
    }
}
