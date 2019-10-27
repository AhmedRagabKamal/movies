import { chain } from 'lodash-es';

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return chain(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
