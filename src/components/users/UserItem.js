import React from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'

const UserItem = props => {
	const { login, avatar_url, html_url } = props.user
	return (
		<div className="card text-center">
			<img
				className="round-img"
				style={{ width: '60px' }}
				src={avatar_url}
				alt=""
			/>
			<h3>{login}</h3>
			<div>
				<Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">
					Go to profile
				</Link>
			</div>
		</div>
	)
}

UserItem.propTypes = {
	user: PropTypes.object.isRequired,
}

export default UserItem
