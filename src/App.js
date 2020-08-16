/** @format */

import React, { useState, useEffect, useContext } from 'react';
import './App.scss';
import APIWrapper from './APIWrapper.js';
import MainLayout from './components/mainLayout/MainLayout';
import FieldSelector from './components/FieldSelector';
import Shelter from './components/shetler.js';
import ApiDataState from './components/context/apiData/ApiDataState';
import FieldSelectorState from './components/context/fieldSelectorContext/FieldSelectorState';
import ThemeDataState from './components/context/themeData/ThemeDataState';
import ApiDataContext from './components/context/apiData/ApiDataContext';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from 'react-router-dom';

// can we get rid of this?
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

const App = () => {
	//search localStorage for saved apiDataState and use it to set categories if found.
	const apiDataContext = useContext(ApiDataContext);
	useEffect(() => {
		if (JSON.parse(localStorage.getItem('apiDataState'))) {
			console.log('trigger local storage');
			apiDataContext.setCategories(
				JSON.parse(localStorage.getItem('appState'))
			);
		}

		//when user hits refresh, navigates away from the page or closes the browser tab, remove state values from localstorage.
		//after 30 minutes, remove users sessionId from localStorage.
		//TODO remove the event listeners after refactor

		window.addEventListener(
			'beforeunload',
			localStorage.removeItem('fsContext')
		);
		window.addEventListener(
			'beforeunload',
			localStorage.removeItem('apiDataContext')
		);
		window.addEventListener('beforeunload', localStorage.removeItem('keyz'));
		window.addEventListener(
			'beforeunload',
			localStorage.removeItem('categories') // this is redundant, remove and change refferences to apiDataContext.categories
		);
		setTimeout(() => {
			localStorage.removeItem('sessionId');
		}, 1800000);
	}, []);

	return (
		<FieldSelectorState>
			<ApiDataState>
				<ThemeDataState>
					<MainLayout>
						<Router>
							<Route exact path='/'>
								<FieldSelector />
							</Route>
							<Route path='/info'>
								<Shelter />
							</Route>
						</Router>
					</MainLayout>
				</ThemeDataState>
			</ApiDataState>
		</FieldSelectorState>
	);
};

export default App;
