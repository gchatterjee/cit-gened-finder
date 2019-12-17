import React from 'react'
import { getClasses } from './table.service'
import { COLUMNS } from './table.constant'
import PropTypes from 'prop-types'

export default class Table extends React.Component {
  constructor(props) {
    super(props)
    this.data = getClasses(this.props.category)
    this.headers = COLUMNS.map(
      name => name.charAt(0).toUpperCase() + name.slice(1)
    )
    this.order = COLUMNS.map(item => this.data.columns.indexOf(item))
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              {this.headers.map(name => (
                <th key={name} scope="col">
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.data.data.map(row => (
              <tr key={row}>
                {this.order.map(index => (
                  <td key={row[index]}>{row[index]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

Table.propTypes = {
  category: PropTypes.string
}
