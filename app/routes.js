import React from 'react'
import { Route, Router } from 'react-router'
import AdminHomePage from './containers/AdminHomePage'
import App from './containers/App'
import HomePage from './containers/HomePage'
import JoinPage from './containers/JoinPage'
import UserPage from './containers/UserPage'
import PartnerPage from './containers/PartnerPage'

export default 
<Router>
  <Route path="/" component={App} />
  <Route path="/join" component={JoinPage} />
  <Route path="/login" component={App} />
  <Route path="/admin-login" component={App} />
  <Route path="/home" component={HomePage} />
  <Route path="/admin-home" component={AdminHomePage} />
  <Route path="/*" component={App} />
</Router>