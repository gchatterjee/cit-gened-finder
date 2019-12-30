import { COLUMN_NAMES, SORT_ORDER } from './table.constant'

export function format(columnName, contents) {
  switch (columnName) {
    case COLUMN_NAMES.NUMBER:
      return contents.slice(0, 2) + '-' + contents.slice(2)
    default:
      return contents
  }
}

export function generateComparisonFunction(sortingOrder, i) {
  if (sortingOrder === SORT_ORDER.BACKWARD) {
    return (a, b) => {
      return a[i] < b[i] ? 1 : a[i] > b[i] ? -1 : 0
    }
  } else {
    return (a, b) => {
      return a[i] > b[i] ? 1 : a[i] < b[i] ? -1 : 0
    }
  }
}
