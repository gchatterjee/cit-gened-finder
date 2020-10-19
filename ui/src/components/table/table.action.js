import { COLUMN_NAMES } from './table.constant'

export function format(columnName, contents) {
  switch (columnName) {
    case COLUMN_NAMES.NUMBER:
      return contents.slice(0, 2) + '-' + contents.slice(2)
    default:
      return contents
  }
}

export function generateComparisonFunction(sortingOrder, i) {
  return (a, b) => sortingOrder * (a[i] > b[i] ? 1 : a[i] < b[i] ? -1 : 0)
}
