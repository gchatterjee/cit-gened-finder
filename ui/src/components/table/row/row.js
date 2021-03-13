import React from 'react'
import PropTypes from 'prop-types'
import { format } from '../table.action'

export default class Row extends React.Component {
  render() {
    const { row, order, columns } = this.props

    return (
      <tr key={row}>
        {order.map(index => {
          const column = columns[index]
          return <td key={row[column]}>{format(column, row[column])}</td>
        })}
      </tr>
    )
  }
}

Row.propTypes = {
  order: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  row: PropTypes.object.isRequired
}
