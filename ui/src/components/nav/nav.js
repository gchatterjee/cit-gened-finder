import React from 'react'
import { NavLink } from 'react-router-dom'
import { PAGE_KEYS } from '../../app.constant'

export default class Nav extends React.Component {
  render() {
    const keys = Object.keys(PAGE_KEYS)
    return (
      <div className="nav_">
        <ul className="nav nav-pills nav-justified">
          {keys.map(key => {
            const route = '/' + key
            return (
              <li className="nav-item" key={key}>
                <NavLink
                  activeClassName="nav-link active"
                  className="nav-link"
                  to={route}
                >
                  {PAGE_KEYS[key]}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
