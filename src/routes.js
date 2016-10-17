import React from 'react'
import { Route, Router } from 'react-router'
import App from './containers/App'
import JoinPage from './containers/JoinPage'
import UserPage from './containers/UserPage'
import PartnerPage from './containers/PartnerPage'

export default 
<Router>
  <Route path="/" component={App} />
  <Route path="/join" component={JoinPage} />
  // <Route path="/:login/:name" component={PartnerPage} />
  <Route path="/:login" component={UserPage} />
</Router>