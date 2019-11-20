export default class SelectQueryService {
    select: string | Array<string> = '*';
    where: string = '';
    limit: number = 0;
    offset: number = 0;
    column: string = '';
    groupBy: string = '';

    constructor(private tableName: string) {}

    setSelect(select: string | Array<string>) {
        this.select = Array.isArray(select)
            ? select.join(', ')
            : select;
        return this;
    }

    setWhere(where: string) {
        this.where = where;
        return this;
    }

    setLimit(limit: number) {
        this.limit = limit;
        return this;
    }

    setOffset(offset: number) {
        this.offset = offset;
        return this;
    }

    setSort(column: string) {
        this.column = column;
        return this;
    }

    setGroupBy(groupBy: string) {
        this.groupBy = groupBy;
        return this;
    }

    getQuery(): string {
        return `SELECT ${
            this.select
        } FROM ${this.tableName} ${
            this.where ? `WHERE ${this.where}`: ''
        } ${
            this.limit ? `LIMIT ${this.limit}` : ''
        } ${
            this.offset ? `OFFSET ${this.offset}` : ''
        } ${
            this.groupBy ? `GROUP BY ${this.groupBy}` : ''
        };`;
    }
}