import BaseError from './BaseError';

export default class UnprocessableEntity extends BaseError {
    status: number = 422;

    constructor(message: string) {
        super(message);
    }
}
