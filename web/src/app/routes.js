import React from 'react'
import { Route, Router } from 'react-router'

import Landing from '../pages/Landing/Landing'
import Alias from '../pages/Alias'

const routes = () => (
<Router>
  <Route path="/" component={Landing}></Route>
  <Route path="/alias/:email/:id" component={alias}</Route>
</Router>
)
export default routes
