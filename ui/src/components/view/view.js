import React from 'react'
import Header from '../header/header'
import Footer from '../footer/footer'
import Table from '../table/table'
import Nav from '../nav/nav'
import PropTypes from 'prop-types'
import { NOT_FOUND_KEY } from '../../app.constant'
import { NOT_FOUND_TEXT } from './view.constant'

export default class View extends React.Component {
  render() {
    return (
      <div className="view">
        <Header pageKey={this.props.pageKey}></Header>
        <Nav></Nav>
        {this.props.pageKey === NOT_FOUND_KEY ? (
          <p>{NOT_FOUND_TEXT}</p>
        ) : (
          <div>
            <Table category={this.props.pageKey}></Table>
          </div>
        )}
        <Footer></Footer>
      </div>
    )
  }
}

View.propTypes = {
  pageKey: PropTypes.string
}
