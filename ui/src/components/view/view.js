import React from 'react'
import Header from '../header/header'
import Footer from '../footer/footer'
import Nav from '../nav/nav'
import NotFound from '../not_found/not_found'
import PropTypes from 'prop-types'

export default class View extends React.Component {
  render() {
    const comps =
      this.props.pageKey === '404' ? (
        <div>
          <NotFound></NotFound>
        </div>
      ) : (
        <div>
          <Header pageKey={this.props.pageKey}></Header>
          <Nav></Nav>
          <Footer></Footer>
        </div>
      )

    return comps
  }
}

View.propTypes = {
  pageKey: PropTypes.string
}
