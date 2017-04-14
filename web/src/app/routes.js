import React from 'react'
import { Route, Router } from 'react-router'

import Landing from '../pages/Landing/Landing'
import Nickname from '../pages/Nickname'

const routes = (
  <Router>
    <Route path="/" component={Landing}></Route>
    <Route path="/nickname/:email/:id" component={Nickname}></Route>
  </Router>
)
export default routes
