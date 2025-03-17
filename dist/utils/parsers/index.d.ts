import { PaginationArgs } from 'src/common/pagination/pagination.dto';
export declare const parseDateToRange: (date: Date) => {
    gte: string;
    lt: string;
};
export declare const getPaginationFilter: (input: PaginationArgs) => {
    take: number;
    skip: number;
};
