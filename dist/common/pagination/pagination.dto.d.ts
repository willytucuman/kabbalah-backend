export declare class PaginationArgs {
    page: number;
    perPage: number;
    orderBy?: string;
    search?: string;
    date: Date;
    startDate: Date;
    endDate: Date;
    get skip(): number;
    get take(): number;
}
