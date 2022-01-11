import React, { useState, Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import axios from 'axios'
import Alert from './components/layout/Alert'
import './App.css'
import About from './components/pages/About'

const github = axios.create({
	baseURL: 'https://api.github.com',
	headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
})

const App = () => {
	const [users, setUsers] = useState([])
	const [user, setUser] = useState({})
	const [repos, setRepos] = useState([])
	const [loading, setLoading] = useState(false)
	const [alert, setAlert] = useState(null)

	const searchUsers = async text => {
		setLoading(true)
		await github
			.get(`/search/users?q=${text}`)
			.then(res => setUsers(res.data.items))
			.then(setLoading(false))
	}

	const getUser = async username => {
		setLoading(true)
		const [thisUser, theseRepos] = await Promise.all([
			github.get(`/users/${username}?`),
			github.get(`/users/${username}/repos?per_page=5&sort=created:asc?`),
		])
			.then(setUser(thisUser))
			.then(setRepos(theseRepos))
			.then(setLoading(false))
	}

	const clearUsers = () => setUsers([]).then(setLoading(false))

	const createAlert = (msg, type) => {
		this.setAlert({ msg, type })
		setTimeout(() => {
			setAlert(null)
		}, 3000)
	}

	return (
		<Router>
			<div className="App">
				<Navbar />
				<div className="container">
					<Alert alert={alert} />
					<Routes>
						<Route
							path="/"
							element={
								<Fragment>
									<Search
										searchUsers={searchUsers}
										clearUsers={clearUsers}
										showClear={users.length > 0 ? true : false}
										setAlert={createAlert}
									/>
									<Users loading={loading} users={users} />
								</Fragment>
							}
						/>
						<Route exact path="/about" element={<About />} />
						<Route
							path="user/:login"
							element={
								<User
									getUser={getUser}
									repos={repos}
									user={user}
									loading={loading}
								/>
							}
						/>
					</Routes>
				</div>
			</div>
		</Router>
	)
}

export default App
