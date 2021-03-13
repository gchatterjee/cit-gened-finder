import { COLUMN_NAMES, COLUMNS } from './table.constant'

export function format(columnName, contents) {
  switch (columnName) {
    case COLUMN_NAMES.NUMBER:
      return contents.slice(0, 2) + '-' + contents.slice(2)
    default:
      return contents
  }
}

export function generateComparisonFunction(sortingOrder, i) {
  const key = COLUMNS[i]
  return (a, b) => sortingOrder * (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0)
}
