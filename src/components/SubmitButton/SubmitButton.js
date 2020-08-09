
import React, {useContext} from 'react';
import './SubmitButton.css';
import { useHistory } from 'react-router-dom';
import APIWrapper from '../../APIWrapper.js';
import ApiDataContext from '../context/apiData/ApiDataContext'
import FieldSelectorContext from '../context/fieldSelectorContext/FieldSelectorContext';

function SubmitButton(props) {
	let history = useHistory();
	const APIKey = process.env.REACT_APP_211_API_KEY;
	const API = new APIWrapper(APIKey);
	const apiDataContext = useContext(ApiDataContext)
	const fieldSelectorContext = useContext(FieldSelectorContext)
	console.log(fieldSelectorContext)
	API.initialize();
	let obj = {
		sn: fieldSelectorContext.serviceName,
		st: '',
		age: Number(fieldSelectorContext.age),
		gender: fieldSelectorContext.gender,
		zip: Number(fieldSelectorContext.zip),
		county: fieldSelectorContext.county,
		catid: fieldSelectorContext.categoryId,
	};

	async function handleClick() {
		console.log('trigger submit');
		console.log(fieldSelectorContext)
		try {
			props.handleIsLoading();
			await props.goBehavior();
			console.log(props.isPageDataValid());
			if (props.isPageDataValid()) {

				//save submit button state to local storage for use if / when user navigates backwards
				localStorage.setItem('submitButtonProps', JSON.stringify(props));
				localStorage.setItem('fsContext', JSON.stringify(fieldSelectorContext));

				//apiDataContext.setResources(await API.getKeywords(obj))
				history.push('/info');

				//If category selected
				//Make getResource call with category data
				//If subCategory selected
				//Make getResource call with subCategory data
				//If subestCategory selected
				//Make getResource call with service name data

				if (fieldSelectorContext.categorySelected === 3) {
					obj['st'] = 's';
					console.log(fieldSelectorContext.categorySelected);
					console.log(obj);
					apiDataContext.setResources(await API.getResource(obj));
				} else if (fieldSelectorContext.categorySelected === 2) {
					obj['st'] = 'sc';
					obj['sn'] = '';
					console.log(obj);
					console.log(fieldSelectorContext.categorySelected);
					apiDataContext.setResources(await API.getResource(obj));
				} else {
					obj['st'] = 'c';
					obj['sn'] = '';
					console.log(obj);
					console.log(props.categorySelected);
					apiDataContext.setResources(await API.getResource(obj));
				}
			}
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<button type='button' onClick={handleClick}>
			Go
		</button>
	);
}
export default SubmitButton;
