import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Partner = ({ partner, owner }) => {
  const { login } = owner
  const { name, description } = partner

  return (
    <div className="Partner">
      <h3>
        <Link to={`/${login}/${name}`}>
          {name}
        </Link>
        {' by '}
        <Link to={`/${login}`}>
          {login}
        </Link>
      </h3>
      {description &&
        <p>{description}</p>
      }
    </div>
  )
}

Partner.propTypes = {
  partner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  owner: PropTypes.shape({
    login: PropTypes.string.isRequired
  }).isRequired
}

export default Partner
