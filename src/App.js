import React, { useState, Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import GithubState from './context/github/GithubState'
import AlertState from './context/alert/AlertState'
import './App.css'
import About from './components/pages/About'

// const github = axios.create({
// 	baseURL: 'https://api.github.com',
// 	headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
// })

const App = () => {
	return (
		<GithubState>
			<AlertState>
				<Router>
					<div className="App">
						<Navbar />
						<div className="container">
							<Alert />
							<Routes>
								<Route
									exact
									path="/"
									element={
										<Fragment>
											<Search />
											<Users />
										</Fragment>
									}
								/>
								<Route exact path="/about" element={<About />} />
								<Route path="user/:login" element={<User />} />
							</Routes>
						</div>
					</div>
				</Router>
			</AlertState>
		</GithubState>
	)
}

export default App
