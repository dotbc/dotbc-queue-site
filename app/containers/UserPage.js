import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUser, loadStarred } from '../actions'
import User from '../components/User'
import Partner from '../components/Partner'
import List from '../components/List'
import zip from 'lodash/zip'

const loadData = ({ login, loadUser, loadStarred }) => {
  loadUser(login, [ 'name' ])
  loadStarred(login)
}

class UserPage extends Component {
  static propTypes = {
    login: PropTypes.string.isRequired,
    user: PropTypes.object,
    starredPagination: PropTypes.object,
    starredPartners: PropTypes.array.isRequired,
    starredPartnerOwners: PropTypes.array.isRequired,
    loadUser: PropTypes.func.isRequired,
    loadStarred: PropTypes.func.isRequired
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.props.login) {
      loadData(nextProps)
    }
  }

  handleLoadMoreClick = () => {
    this.props.loadStarred(this.props.login, true)
  }

  renderPartner([ partner, owner ]) {
    return (
      <Partner
        partner={partner}
        owner={owner}
        key={partner.fullName} />
    )
  }

  render() {
    const { user, login } = this.props
    if (!user) {
      return <h1><i>Loading {login}{"'s profile..."}</i></h1>
    }

    const { starredPartners, starredPartnerOwners, starredPagination } = this.props
    return (
      <div>
        <User user={user} />
        <hr />
        <List renderItem={this.renderPartner}
              items={zip(starredPartners, starredPartnerOwners)}
              onLoadMoreClick={this.handleLoadMoreClick}
              loadingLabel={`Loading ${login}'s starred...`}
              {...starredPagination} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // We need to lower case the login due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.
  const login = ownProps.params.login.toLowerCase()

  const {
    pagination: { starredByUser },
    entities: { users, partners }
  } = state

  const starredPagination = starredByUser[login] || { ids: [] }
  const starredPartners = starredPagination.ids.map(id => partners[id])
  const starredPartnerOwners = starredPartners.map(partner => users[partner.owner])

  return {
    login,
    starredPartners,
    starredPartnerOwners,
    starredPagination,
    user: users[login]
  }
}

export default connect(mapStateToProps, {
  loadUser,
  loadStarred
})(UserPage)
