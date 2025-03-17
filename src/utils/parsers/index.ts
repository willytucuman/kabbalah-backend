import * as moment from 'moment';
import { PaginationArgs } from 'src/common/pagination/pagination.dto';

export const parseDateToRange = (date: Date) => {
  const newDate = moment.utc(date);
  return {
    gte: newDate.startOf('day').toISOString(),
    lt: newDate.endOf('day').toISOString(),
  };
};

export const getPaginationFilter = (input: PaginationArgs) => ({
  take: input.perPage,
  skip: (input.page - 1) * input.perPage,
});
