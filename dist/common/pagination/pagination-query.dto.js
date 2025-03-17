"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationParse = void 0;
const PaginationParse = (data, total, pagination) => {
    const { page, perPage } = pagination;
    const cantPages = Math.ceil(total / perPage);
    return {
        data: data,
        page: page,
        perPage: perPage,
        total,
        totalPages: cantPages,
    };
};
exports.PaginationParse = PaginationParse;
//# sourceMappingURL=pagination-query.dto.js.map