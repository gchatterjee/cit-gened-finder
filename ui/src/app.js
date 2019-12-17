import React from 'react'
import View from './components/view/view'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { PAGE_KEYS, NOT_FOUND_KEY } from './app.constant'

export default function App() {
  const keys = Object.keys(PAGE_KEYS)
  const defaultRoute = '/' + keys[0]
  const notFoundRoute = '/' + NOT_FOUND_KEY

  return (
    <div className="container">
      <Router
        basename={process.env.PUBLIC_URL} //eslint-disable-line no-undef
      >
        <Switch>
          {keys.map(key => {
            const route = '/' + key
            return (
              <Route key={key} path={route}>
                <View pageKey={key}></View>
              </Route>
            )
          })}
          <Route path={notFoundRoute}>
            <View pageKey={NOT_FOUND_KEY}></View>
          </Route>
          <Route exact path="/">
            <Redirect to={defaultRoute}></Redirect>
          </Route>
          <Route path="*">
            <Redirect to={notFoundRoute}></Redirect>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}
