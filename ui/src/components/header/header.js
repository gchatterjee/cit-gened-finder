import React from 'react'
import { PAGE_KEYS } from '../../app.constant'
import { TITLE } from './header.constant'
import PropTypes from 'prop-types'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.text = PAGE_KEYS[this.props.pageKey]
  }

  render() {
    return (
      <div>
        <h1>{TITLE}</h1>
        <h2>{this.text}</h2>
      </div>
    )
  }
}

Header.propTypes = {
  pageKey: PropTypes.string
}
