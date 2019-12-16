import React from 'react'
import { PAGE_KEYS } from '../../app.constant'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.text = PAGE_KEYS[this.props.pageKey]
  }

  render() {
    return (
      <div>
        <h1>{this.text}</h1>
      </div>
    )
  }
}
