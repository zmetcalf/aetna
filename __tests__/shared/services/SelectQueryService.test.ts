import SelectQueryService from '../../../shared/src/services/SelectQueryService';

describe('SelectQueryService', () => {
    it('should generate proper SQL', () => {
        expect(new SelectQueryService('ratings')
            .setSelect('ratingId')
            .setWhere('movieID = 43')
            .setGroupBy('movieId')
            .getQuery()
        ).toBe('SELECT ratingId FROM ratings WHERE movieID = 43   GROUP BY movieId;');
    });

    it('should generate proper SQL with array in select', () => {
        expect(new SelectQueryService('ratings')
            .setSelect(['ratingId', 'movieId'])
            .setWhere('movieID = 43')
            .setGroupBy('movieId')
            .getQuery()
        ).toBe('SELECT ratingId, movieId FROM ratings WHERE movieID = 43   GROUP BY movieId;');
    });
});