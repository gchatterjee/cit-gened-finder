import React from 'react'
import { capitalize } from 'lodash'
import { getClasses } from '../../services/data.service'
import { generateComparisonFunction } from './table.action'
import { COLUMNS, SORT_ORDER } from './table.constant'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCaretSquareDown,
  faCaretSquareUp
} from '@fortawesome/free-solid-svg-icons'
import Row from './row/row'

export default class Table extends React.Component {
  constructor(props) {
    super(props)
    this.data = getClasses(this.props.category)
    this.columns = COLUMNS
    this.order = COLUMNS.map(item => this.columns.indexOf(item))
    this.sorted = {
      column: undefined,
      order: undefined
    }
    this.sort = this.sort.bind(this)
  }

  sort(columnName) {
    const columnIndex = this.columns.indexOf(columnName)
    if (
      this.sorted.order === SORT_ORDER.FORWARD &&
      this.sorted.column === columnName
    ) {
      this.data.sort(
        generateComparisonFunction(SORT_ORDER.BACKWARD, columnIndex)
      )
      this.sorted.order = SORT_ORDER.BACKWARD
    } else {
      this.data.sort(
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
                  key={this.columns[index]}
                  onClick={() => {
                    this.sort(this.columns[index])
                    this.forceUpdate()
                  }}
                >
                  <div className="table-head">
                    <span className="leftAlign">
                      {capitalize(this.columns[index])}
                    </span>
                    <span
                      className={
                        'rightAlign' + this.caretTags(this.columns[index])
                      }
                    >
                      &nbsp;
                      <FontAwesomeIcon
                        icon={
                          this.arrowDirection(this.columns[index]) ===
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
            {this.data.map(row => (
              <Row
                key={JSON.stringify(row)}
                row={row}
                columns={this.columns}
                order={this.order}
              />
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
