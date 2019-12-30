import React from 'react'
import Header from '../header/header'
import Footer from '../footer/footer'
import Table from '../table/table'
import Nav from '../nav/nav'
import PropTypes from 'prop-types'

export default class View extends React.Component {
  render() {
    return (
      <div className="view">
        <Header pageKey={this.props.pageKey}></Header>
        <Nav></Nav>
        <Table category={this.props.pageKey}></Table>
        <Footer></Footer>
      </div>
    )
  }
}

View.propTypes = {
  pageKey: PropTypes.string
}
