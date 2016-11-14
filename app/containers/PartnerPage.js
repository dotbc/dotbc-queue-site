import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadPartner, loadStargazers } from '../actions'
import Partner from '../components/Partner'
import User from '../components/User'
import List from '../components/List'

const loadData = props => {
  const { fullName } = props
  props.loadPartner(fullName, [ 'description' ])
  props.loadStargazers(fullName)
}

class PartnerPage extends Component {
  static propTypes = {
    partner: PropTypes.object,
    fullName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.object,
    stargazers: PropTypes.array.isRequired,
    stargazersPagination: PropTypes.object,
    loadPartner: PropTypes.func.isRequired,
    loadStargazers: PropTypes.func.isRequired
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fullName !== this.props.fullName) {
      loadData(nextProps)
    }
  }

  handleLoadMoreClick = () => {
    this.props.loadStargazers(this.props.fullName, true)
  }

  renderUser(user) {
    return <User user={user} key={user.login} />
  }

  render() {
    const { partner, owner, name } = this.props
    if (!partner || !owner) {
      return <h1><i>Loading {name} details...</i></h1>
    }

    const { stargazers, stargazersPagination } = this.props
    return (
      <div>
        <Partner partner={partner}
              owner={owner} />
        <hr />
        <List renderItem={this.renderUser}
              items={stargazers}
              onLoadMoreClick={this.handleLoadMoreClick}
              loadingLabel={`Loading stargazers of ${name}...`}
              {...stargazersPagination} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // We need to lower case the login/name due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.
  const login = ownProps.params.login.toLowerCase()
  const name = ownProps.params.name.toLowerCase()

  const {
    pagination: { stargazersByPartner },
    entities: { users, partners }
  } = state

  const fullName = `${login}/${name}`
  const stargazersPagination = stargazersByPartner[fullName] || { ids: [] }
  const stargazers = stargazersPagination.ids.map(id => users[id])

  return {
    fullName,
    name,
    stargazers,
    stargazersPagination,
    partner: partners[fullName],
    owner: users[login]
  }
}

export default connect(mapStateToProps, {
  loadPartner,
  loadStargazers
})(PartnerPage)
