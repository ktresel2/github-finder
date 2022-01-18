import React, { useReducer } from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import githubReducer from './githubReducer'
import {
	SEARCH_USERS,
	SET_LOADING,
	CLEAR_USERS,
	GET_USER_AND_REPOS,
	GET_REPOS,
} from '../types'

const github = axios.create({
	baseURL: 'https://api.github.com',
	headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
})

const GithubState = props => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
	}

	const [state, dispatch] = useReducer(githubReducer, initialState)

	const searchUsers = async text => {
		setLoading(true)
		const res = await github.get(`/search/users?q=${text}`)
		// console.log(res)
		dispatch({
			type: SEARCH_USERS,
			payload: res.data.items,
		})
	}

	const getUserAndRepos = async login => {
		setLoading()
		const [thisUser, theseRepos] = await Promise.all([
			github.get(`/users/${login}?`),
			github.get(`/users/${login}/repos?per_page=5&sort=created:asc?`),
		])
		dispatch({
			type: GET_USER_AND_REPOS,
			user: thisUser.data,
			repos: theseRepos.data,
		})
	}

	const clearUsers = () =>
		dispatch({
			type: CLEAR_USERS,
		})

	// const showAlert = (msg, type) => {
	// 	setAlert({ msg, type })
	// 	setTimeout(() => {
	// 		setAlert(null)
	// 	}, 3000)
	// }

	const setLoading = () => dispatch({ type: SET_LOADING })

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				loading: state.loading,
				searchUsers,
				clearUsers,
				getUserAndRepos,
			}}
		>
			{props.children}
		</GithubContext.Provider>
	)
}

export default GithubState
