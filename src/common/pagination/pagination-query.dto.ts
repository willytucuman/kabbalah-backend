export const PaginationParse = (data, total, pagination) => {
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
