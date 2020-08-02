
import React, { PureComponent, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import FieldSelector from './components/FieldSelector';
import NavBlock from './components/NavigationBlock';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import APIWrapper from './APIWrapper.js';
import ExclusiveOption from './components/ExclusiveOption';
import Section from './components/Section';
import { ThemeContext } from './ThemeContext';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from 'react-router-dom';
import Shelter from './components/shetler.js';

const navbar = {};
navbar.brand = { linkTo: '#', text: 'Portland Shelters' };
navbar.links = [
	{ linkTo: '#', text: 'Contact Us' },
	{ linkTo: '#', text: 'How many links do we need?' },
	{
		dropdown: false,
		text: 'Do we want a Dropdown?',
		links: [
			{ linkTo: '#', text: 'Dropdown Link 1' },
			{ linkTo: '#', text: 'Dropdown Link 2' },
		],
	},
];

const APIKey = process.env.REACT_APP_211_API_KEY;
const API = new APIWrapper(APIKey);

//TODO figure out why appstate leaves localstorage after hitting refresh AFTER navigating backwards from results page
const App = () => {
	console.log('app rendered');
	const [appState, setAppState] = useState({
		themeColor: 'light',
		sessionID: null,
		categories: [],
		resources: [],
	});

	const setResources = (resources) => {
		localStorage.setItem('appState', JSON.stringify(appState));
		setAppState({ ...appState, resources: resources });
	};

	useEffect(() => {
		if (JSON.parse(localStorage.getItem('appState'))) {
			console.log('trigger local storage');
			setAppState(JSON.parse(localStorage.getItem('appState')));
		}

		//when user navigates away from the page or closes the browser tab, remove appState fieldselectorstate and categoryselectorstate and sessionId from localstorage
		//after 30 minutes, remove users sessionId from localStorage.
		//TODO remove the event listeners after refactor
		window.addEventListener(
			'beforeunload',
			localStorage.removeItem('appState')
		);
		window.addEventListener(
			'beforeunload',
			localStorage.removeItem('fieldSelectorState')
		);
		window.addEventListener(
			'beforeunload',
			localStorage.removeItem('submitButtonProps')
		);
		window.addEventListener(
			'beforeunload',
			localStorage.removeItem('categorySelectorState')
		);
		window.addEventListener(
			'beforeunload',
			localStorage.removeItem('sessionId')
		);
		// setTimeout(() => {
		// 	localStorage.removeItem('sessionId');
		// }, 1800000);
	}, []);

	return (
		<ThemeContext.Provider value={appState.themeColor}>
			<Router>
				<div className={'app ' + appState.themeColor}>
					<div id='left-gutter-container'>
						<button
							onClick={(e) =>
								setAppState({
									...appState,
									themeColor:
										appState.themeColor === 'light' ? 'dark' : 'light',
								})
							}>
							Swap Theme
						</button>
						Left Gutter
					</div>

					<div id='main-container'>
						Main Container
						<Route exact path='/'>
							<FieldSelector setResources={setResources} />
						</Route>
						<Route path='/info'>
							<Shelter shelters={appState.resources} />
						</Route>
					</div>

					<div id='right-gutter-container'>Right Gutter</div>
				</div>
			</Router>
		</ThemeContext.Provider>
	);
};

export default App;
