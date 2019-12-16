import React from 'react'
import Header from '../header/header'
import Footer from '../footer/footer'
import NotFound from '../not_found/not_found'

export default class View extends React.Component {
  render() {

    const comps = this.props.pageKey === '404' ? (
      <div><NotFound></NotFound></div>
    ) : (
      <div>
        <Header pageKey={this.props.pageKey}></Header>
        <Footer></Footer>
      </div>
    )

    return comps
  }
}
