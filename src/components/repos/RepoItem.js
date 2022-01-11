import React from 'react'
import PropTypes from 'prop-types'

export const RepoItem = repo => {
	return (
		<div className="card">
			<h3>
				<a href={repo.repo.html_url}>{repo.repo.name}</a>
			</h3>
		</div>
	)
}

RepoItem.propTypes = {
	repo: PropTypes.object.isRequired,
}

export default RepoItem
