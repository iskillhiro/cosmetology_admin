import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.scss'
import Auth from './components/Auth/Auth.jsx'
import Home from './components/Home/Home.jsx'
import Navigation from './components/Navigation/Navigation.jsx'
import Raffle from './components/Raffle/Raffle.jsx'
import Sending from './components/Sending/Sending.jsx'
function App() {
	return (
		<Router>
			<Navigation />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/auth' element={<Auth />} />
				<Route path='/sending' element={<Sending />} />
				<Route path='/raffle' element={<Raffle />} />
			</Routes>
		</Router>
	)
}

export default App
