"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginationFilter = exports.parseDateToRange = void 0;
const moment = require("moment");
const parseDateToRange = (date) => {
    const newDate = moment.utc(date);
    return {
        gte: newDate.startOf('day').toISOString(),
        lt: newDate.endOf('day').toISOString(),
    };
};
exports.parseDateToRange = parseDateToRange;
const getPaginationFilter = (input) => ({
    take: input.perPage,
    skip: (input.page - 1) * input.perPage,
});
exports.getPaginationFilter = getPaginationFilter;
//# sourceMappingURL=index.js.map