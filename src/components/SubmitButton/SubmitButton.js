/** @format */

import React from 'react';
import './SubmitButton.css';
import { useHistory } from 'react-router-dom';
import APIWrapper from '../../APIWrapper.js';

function SubmitButton(props) {
	let history = useHistory();
	const APIKey = process.env.REACT_APP_211_API_KEY;
	const API = new APIWrapper(APIKey);
	console.log('submitButton props: ', props);
	API.initialize();
	let obj = {
		sn: props.serviceName,
		st: '',
		age: Number(props.fieldSelectorState.age),
		gender: props.fieldSelectorState.gender,
		zip: Number(props.fieldSelectorState.zip),
		county: props.fieldSelectorState.county,
		catid: props.categoryID,
	};

	async function handleClick() {
		console.log('trigger submit');
		try {
			props.handleIsLoading();
			await props.goBehavior();
			console.log(props.isPageDataValid());
			if (props.isPageDataValid()) {
				console.log('trigger page data is valid');
				// console.log(props.fieldSelectorState);
				//save field selector state to local storage for use if / when user navigates backwards
				localStorage.setItem(
					'fieldSelectorState',
					JSON.stringify(props.fieldSelectorState)
				);
				localStorage.setItem('submitButtonProps', JSON.stringify(props));
				//props.setResources(await API.getKeywords(obj))
				history.push('/info');

				//If category selected
				//Make getResource call with category data
				//If subCategory selected
				//Make getResource call with subCategory data
				//If subestCategory selected
				//Make getResource call with service name data

				console.log('here is the object from submitButton: ', obj);
				console.log(
					'here is categorySelected from props: ',
					props.categorySelected
				);
				// console.log('here is the category selected from props in submit button', props.categorySelected);
				if (props.categorySelected === 3) {
					obj['st'] = 's';
					console.log(props.categorySelected);
					console.log(obj);
					props.setResources(await API.getResource(obj));
				} else if (props.categorySelected === 2) {
					obj['st'] = 'sc';
					obj['sn'] = '';
					console.log(obj);
					console.log(props.categorySelected);
					props.setResources(await API.getResource(obj));
				} else {
					obj['st'] = 'c';
					obj['sn'] = '';
					console.log(obj);
					console.log(props.categorySelected);
					props.setResources(await API.getResource(obj));
				}
			}
		} catch (error) {
			console.log(error);
		}
		props.handleIsLoading();
	}
	return (
		<button type='button' onClick={handleClick}>
			Go
		</button>
	);
}
export default SubmitButton;
