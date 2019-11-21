import MovieRecord from "../records/MovieRecord";
import NotFound from "../../../shared/src/errors/NotFound";
import request from "request-promise";

export default class GetOneService {
    movieResult: Movie | undefined;

    constructor(private db: any, private id: string) {}

    async getRecord() {
        // @ts-ignore
        this.movieResult = await (new MovieRecord(this.db))
            .getById(this.id);

        if(!this.movieResult) throw new NotFound(`${this.id} is not found`);
        return this;
    }

    async getRating() {
        if(!this.movieResult) throw Error('Movie result has not been set by database');

        try {
            const response = await request(
                `${process.env.RATING_SERVICE || 'http://localhost:3000'}/rating?average=movieId&averageId=${this.id}`,
                { json: true }
            );

            this.movieResult.rating = response.averageRating || null;
        } catch(e) {
            console.error(e);
            this.movieResult.rating = null;
        }
        return this;
    }

    setDollarsOnBudget() {
        if(!this.movieResult) throw new Error('movie result has not been set by database');
        if(!this.movieResult.budget) throw new Error('movie result has not been set by database');

        this.movieResult.budget = this.movieResult.budget ? `$${this.movieResult.budget}` : null;
        return this;
    }

    getResult() {
        return this.movieResult;
    }
}