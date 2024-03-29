import {
	SEARCH_USERS,
	SET_LOADING,
	CLEAR_USERS,
	GET_USER_AND_REPOS,
} from '../types'

export const githubReducer = (state, action) => {
	switch (action.type) {
		case SEARCH_USERS:
			return {
				...state,
				users: action.payload,
				loading: false,
			}
		case GET_USER_AND_REPOS:
			return {
				...state,
				user: action.user,
				repos: action.repos,
				loading: false,
			}
		case CLEAR_USERS:
			return {
				...state,
				users: [],
				loading: false,
			}
		case SET_LOADING:
			return {
				...state,
				loading: true,
			}
		default:
			return state
	}
}

export default githubReducer
