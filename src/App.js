import React, { Component, Fragment } from 'react'
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

class App extends Component {
	state = {
		users: [],
		user: {},
		repos: [],
		loading: false,
		alert: null,
	}

	searchUsers = async text => {
		this.setState({ loading: true })
		const res = await github.get(`/search/users?q=${text}`)
		this.setState({ users: res.data.items, loading: false })
	}

	getUser = async username => {
		this.setState({ loading: true })
		const [user, repos] = await Promise.all([
			github.get(`/users/${username}?`),
			github.get(`/users/${username}/repos?per_page=5&sort=created:asc?`),
		])
		console.log(repos)
		this.setState({ user: user.data, repos: repos.data, loading: false })
	}

	clearUsers = () => this.setState({ users: [], loading: false })

	setAlert = (msg, type) => {
		this.setState({ alert: { msg, type } })
		setTimeout(() => {
			this.setState({ alert: null })
		}, 3000)
	}

	render() {
		const { users, user, repos, loading } = this.state
		return (
			<Router>
				<div className="App">
					<Navbar />
					<div className="container">
						<Alert alert={this.state.alert} />
						<Routes>
							<Route
								path="/"
								element={
									<Fragment>
										<Search
											searchUsers={this.searchUsers}
											clearUsers={this.clearUsers}
											showClear={users.length > 0 ? true : false}
											setAlert={this.setAlert}
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
										getUser={this.getUser}
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
}

export default App
