import React from 'react'
import { PAGE_KEYS, NOT_FOUND_KEY } from '../../app.constant'
import { TITLE, NOT_FOUND_SUBTITLE } from './header.constant'
import Title from '../title/title'
import PropTypes from 'prop-types'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.subtitle =
      this.props.pageKey === NOT_FOUND_KEY
        ? NOT_FOUND_SUBTITLE
        : PAGE_KEYS[this.props.pageKey]
  }

  render() {
    return (
      <div className="header">
        <Title title={TITLE}></Title>
        <h2>{this.subtitle}</h2>
      </div>
    )
  }
}

Header.propTypes = {
  pageKey: PropTypes.string
}
