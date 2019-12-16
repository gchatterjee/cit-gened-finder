import React from 'react'
import View from './components/view/view'
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom'
import { PAGE_KEYS, NOT_FOUND_KEY } from './app.constant'

export default function App() {
    const keys = Object.keys(PAGE_KEYS)
    const defaultRoute = '/' + keys[0]
    return (
      <Router>
      <div>
        <ul className="nav">
          {keys.map(key => {
            const route = '/' + key
            return (
              <li className="nav-item" key={key}>
                <Link className="nav-link" to={route}>
                  {PAGE_KEYS[key]}
                </Link>
              </li>
            )
          })
        }
        </ul>
        <Switch>
          {keys.map(key => {
            const route = '/' + key
            return (
              <Route key={key} path={route}>
                <View pageKey={key}></View>
              </Route>
            )
          })}
          <Route exact path="/">
            <Redirect to={defaultRoute}></Redirect>
          </Route>
          <Route path="*">
            <View pageKey={NOT_FOUND_KEY}></View>
          </Route>
        </Switch>
        </div>
      </Router>
    )
  }
