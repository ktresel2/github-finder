import React, { useEffect, Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import Spinner from './../layout/Spinner'
import PropTypes from 'prop-types'
import Repos from './../repos/Repos'

function User({ user, loading, getUser, repos }) {
	const params = useParams()
	const {
		name,
		avatar_url,
		company,
		location,
		bio,
		blog,
		login,
		html_url,
		followers,
		following,
		public_repos,
		public_gists,
		hireable,
	} = user

	useEffect(() => {
		getUser(params.login)
		console.log(repos)
	}, [])

	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<Link to="/" className="btn btn-dark">
				Back to search
			</Link>
			Hireable:{' '}
			{hireable ? (
				<i className="fas fa-check text-success" />
			) : (
				<i className="fas fa-times-circle text-danger" />
			)}
			<div className="card grid-2">
				<div className="all-center">
					<img
						src={avatar_url}
						className="round-img"
						style={{ width: '150px' }}
						alt=""
					/>
					<h1>{name}</h1>
					<p>{location}</p>
				</div>
				<div>
					{bio && (
						<Fragment>
							<h3>Bio</h3>
							<p>{bio}</p>
						</Fragment>
					)}
					<a href={html_url} className="btn btn-dark my-1">
						Visit profile
					</a>
					<ul>
						<li>
							{login && (
								<Fragment>
									<strong>Username: </strong> {login}
								</Fragment>
							)}
						</li>
						<li>
							{company && (
								<Fragment>
									<strong>Company: </strong> {company}
								</Fragment>
							)}
						</li>
						<li>
							{blog && (
								<Fragment>
									<strong>Website: </strong> {blog}
								</Fragment>
							)}
						</li>
					</ul>
				</div>
			</div>
			<div className="card text-center">
				<div className="badge badge-primary">Followers: {followers}</div>
				<div className="badge badge-success">Following: {following}</div>
				<div className="badge badge-light">Public Repos: {public_repos}</div>
				<div className="badge badge-dark">Public Gists: {public_gists}</div>
			</div>
			<div>
				<Repos repos={repos} />
			</div>
		</Fragment>
	)
}

User.propTypes = {
	loading: PropTypes.bool,
	user: PropTypes.object.isRequired,
	repos: PropTypes.array.isRequired,
	getUser: PropTypes.func.isRequired,
	getUserRepos: PropTypes.func.isRequired,
}

export default User
