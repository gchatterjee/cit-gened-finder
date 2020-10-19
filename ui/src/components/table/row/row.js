import React from 'react'
import PropTypes from 'prop-types'
import { format } from '../table.action'

export default class Row extends React.Component {
  render() {
    const { row, order, columns } = this.props

    return (
      <tr key={row}>
        {order.map(index => (
          <td key={row[index]}>{format(columns[index], row[index])}</td>
        ))}
      </tr>
    )
  }
}

Row.propTypes = {
  order: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  row: PropTypes.array.isRequired
}
