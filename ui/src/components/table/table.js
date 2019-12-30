import React from 'react'
import { capitalize } from '../../util'
import { getClasses } from './table.service'
import { format, generateComparisonFunction } from './table.action'
import { COLUMNS, SORT_ORDER } from './table.constant'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCaretSquareDown,
  faCaretSquareUp
} from '@fortawesome/free-solid-svg-icons'

export default class Table extends React.Component {
  constructor(props) {
    super(props)
    this.data = getClasses(this.props.category)
    this.order = COLUMNS.map(item => this.data.columns.indexOf(item))
    this.sorted = {
      column: undefined,
      order: undefined
    }
    this.sort = this.sort.bind(this)
  }

  sort(columnName) {
    const columnIndex = this.data.columns.indexOf(columnName)
    if (
      this.sorted.order === SORT_ORDER.FORWARD &&
      this.sorted.column === columnName
    ) {
      this.data.data.sort(
        generateComparisonFunction(SORT_ORDER.BACKWARD, columnIndex)
      )
      this.sorted.order = SORT_ORDER.BACKWARD
    } else {
      this.data.data.sort(
        generateComparisonFunction(SORT_ORDER.FORWARD, columnIndex)
      )
      this.sorted.order = SORT_ORDER.FORWARD
    }
    this.sorted.column = columnName
  }

  caretTags(columnName) {
    let tags = ''
    if (columnName === this.sorted.column) {
      tags +=
        ' active' +
        (this.sorted.order === SORT_ORDER.BACKWARD ? ' backward' : ' forward')
    }
    return tags
  }

  arrowDirection(columnName) {
    if (columnName === this.sorted.column) {
      return this.sorted.order
    } else {
      return SORT_ORDER.FORWARD
    }
  }

  render() {
    return (
      <div className="table_">
        <table className="table">
          <thead>
            <tr>
              {this.order.map(index => (
                <th
                  key={this.data.columns[index]}
                  onClick={() => {
                    this.sort(this.data.columns[index])
                    this.forceUpdate()
                  }}
                >
                  <div>
                    <span className="leftAlign">
                      {capitalize(this.data.columns[index])}
                    </span>
                    <span
                      className={
                        'rightAlign' + this.caretTags(this.data.columns[index])
                      }
                    >
                      <FontAwesomeIcon
                        icon={
                          this.arrowDirection(this.data.columns[index]) ===
                          SORT_ORDER.FORWARD
                            ? faCaretSquareDown
                            : faCaretSquareUp
                        }
                      ></FontAwesomeIcon>
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.data.data.map(row => (
              <tr key={row}>
                {this.order.map(index => (
                  <td key={row[index]}>
                    {format(this.data.columns[index], row[index])}
                  </td>
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
