/** @format */

import React, { useState, useEffect, useContext } from 'react';
import ExclusiveOption from './ExclusiveOption';
import TextInput from './TextInput';
import '../Assets/FieldSelector.scss';
import { ThemeContext } from '../ThemeContext';
import Section from './Section';
import APIWrapper from '../APIWrapper.js';
import InputLabel from './InputLabel';
import SubmitButton from './SubmitButton/SubmitButton.js';
import CategorySelector from './categorySelector/categorySelector.js';
import CountySelect from './CountySelect';
import Spinner from '../Assets/spinner.gif';
import SearchBar from './SearchBar/SearchBar';
import ApiDataContext from './context/apiData/ApiDataContext';
import FieldSelectorContext from './context/fieldSelectorContext/FieldSelectorContext';
const CensusAPIKey = process.env.REACT_APP_CENSUS_API_KEY;

const APIKey = process.env.REACT_APP_211_API_KEY;
const API = new APIWrapper(APIKey);

const FieldSelector = (props) => {
	const themeContext = useContext(ThemeContext);
	const fieldSelectorContext = useContext(FieldSelectorContext);
	const apiDataContext = useContext(ApiDataContext);
	const [apiCategories, setApiCategories] = useState([]);

	async function callAPI() {
		await API.initialize();
		setApiCategories(await API.getCategories());
	}

	const [categorySelected, setCategorySelected] = useState('');
	const handleCategorySelected = (category) => {
		setCategorySelected(category);
	};

	const [isLoading, setIsLoading] = useState(false);
	const handleIsLoading = () => {
		setIsLoading(!isLoading);
	};

	const [buttonState, setButtonState] = useState({
		category: '',
		subCat: [{ subCategory: '', subCatTerm: [{ sterm: '' }] }],
	});

	const handleButtonStateChange = (newState) => {
		setButtonState(newState);
	};

	const [serviceName, setServiceName] = useState('');
	const handleServiceChange = (service) => {
		setServiceName(service);
	};

	const [categoryID, setCategoryID] = useState('');
	const handleCatIDChange = (catID) => {
		setCategoryID(catID);
	};

	const [familySize, setFamilySize] = useState('');
	const handleFamilySizeChange = (familysize) => {
		setFamilySize(familysize);
	};

	const [gender, setGender] = useState('Male');
	const handleGenderChange = (gender) => {
		setGender(gender);
	};

	const [age, setAge] = useState('');
	const handleAgeChange = (age) => {
		setAge(age);
	};

	const [zipCode, setZipCode] = useState('');
	const handleZIPChange = async (zip) => {
		setZipCode(zip);
	};

	const [possibleCounties, setPossibleCounties] = useState();

	const [county, setCounty] = useState('');
	const handleCountyChange = (county) => {
		setCounty(county);
	};

	const [isValidCounty, setIsValidCounty] = useState('null');

	const [doValidation, setDoValidation] = useState(false);

	const validFamilySize = (familySize) => {
		let message = '';
		let empty = familySize === '';

		if (empty) return { valid: false, message: 'Required entry.' };

		let valid = familySize >= 0 && familySize <= 16;
		if (!valid) message = 'You don have that many chilren!';

		return { valid, message };
	};

	const validGender = (gender) => {
		let message = '';

		let empty = gender === '';
		if (empty) message = 'Required entry.';

		let valid = !empty;

		return { valid, message };
	};

	const validAge = (age) => {
		let message = '';

		if (!age) return { valid: false, message: 'Required entry.' };

		// Using a regex here to recognize positive non-leading zero integers
		let isPositiveInteger = /^[1-9]([0-9]*)$/.test(age);
		if (!isPositiveInteger)
			message = 'Please enter a positive round number like 18 or 56.';

		// TODO: Maybe remove this case.
		let isReallyOld = parseInt(age) >= 120;
		if (isReallyOld)
			message = "It's unlikely this age is correct. Is this a typo?";

		let valid = isPositiveInteger && !isReallyOld;

		return { valid, message };
	};

	const getAllPossibleCountiesByZip = async (zip) => {
		fieldSelectorContext.setZipcode(zip); 
		if (validZIP(zip).valid) {
			await API.getCountyByZipCode({
				zip: fieldSelectorContext.zipCode,
			}).then((data) => {
				fieldSelectorContext.setPossibleCounties(
					Object.values(data).map((value) => {
						return value['county'];
					})
				);
			});
		}

	};

	const validZIP = (zip) => {
		let message = '';
		if (!zip) return { valid: false, message: 'Required entry.' };

		let isPositiveInteger = /^([0-9]\d*)$/.test(zip);
		if (!isPositiveInteger)
			message = 'Please only use numbers in the ZIP code.';

		// TODO: Verify this assumption. ZIPs can be very weird
		let correctLength = zip.length === 5;
		if (!correctLength)
			message = 'ZIP codes are usually 5 digits long. Is this mistyped?';

		let valid = correctLength && isPositiveInteger;

		return { valid, message };
	};

	const validCounty = (county) => {
		let valid = null;
		let message = '';
		if (!county) {
			return { valid: false, message: 'Required entry.' };
		} else if (isValidCounty) {
			return { valid: true, message };
		} else if (!isValidCounty) {
			return { valid: false, message: 'This is not an OR or WA county.' };
		}
	};

	const findLocation = () => {
		// console.log(
		"Then we'd try to find their location using a Google API. For now...";
		// );
		fieldSelectorContext.setZipcode('97206');
		fieldSelectorContext.setCounty('Clackamas');
	};

	const onlyNumbers = (str) => {
		let characterArray = str.split('');
		let numberArray = characterArray.filter(
			(character) => '0123456789'.indexOf(character) !== -1
		);
		return numberArray.join('');
	};

	// const countyAPICall = async () => {
	// 	await fetch(
	// 		/*https://cors-anywhere.herokuapp.com/ need to be removed for production. For testing purposes in localhost
    //   this proxy prevents cors errors from being thrown by chrome. When the project is hosted somewhere, these errors
    //   won't be an issue.*/
	// 		`https://cors-anywhere.herokuapp.com/https://api.census.gov/data/timeseries/poverty/saipe?get=NAME&for=county:*&in=state:41,53&time=2018&key=${CensusAPIKey}`,
	// 		{
	// 			crossDomain: true,
	// 			method: 'GET',
	// 			headers: { 'Content-Type': 'application/json' },
	// 		}
	// 	)
	// 		.then((result) => {
	// 			return result.json();
	// 		})
	// 		.then((data) => {
	// 			const countiesORWA = [];
	// 			data.forEach((el) =>
	// 				countiesORWA.push(
	// 					el[0].toLowerCase().split('').reverse().slice(7).reverse().join('')
	// 				)
	// 			);
	// 			countiesORWA.shift();
	// 			if (countiesORWA.includes(county.toLowerCase())) {
	// 				setIsValidCounty(true);
	// 			} else {
	// 				setIsValidCounty(false);
	// 			}
	// 		})
	// 		//Hardcoding here is a backup list of all counties serviced in case api fails.
	// 		.catch((err) => {
	// 			const countiesORWA = [
	// 				'baker',
	// 				'benton',
	// 				'clackamas',
	// 				'clatsop',
	// 				'columbia',
	// 				'coos',
	// 				'crook',
	// 				'curry',
	// 				'deschutes',
	// 				'douglas',
	// 				'gilliam',
	// 				'grant',
	// 				'harney',
	// 				'hood river',
	// 				'jackson',
	// 				'jefferson',
	// 				'josephine',
	// 				'klamath',
	// 				'lake',
	// 				'lane',
	// 				'lincoln',
	// 				'linn',
	// 				'malheur',
	// 				'marion',
	// 				'morrow',
	// 				'multnomah',
	// 				'polk',
	// 				'sherman',
	// 				'tillamook',
	// 				'umatilla',
	// 				'union',
	// 				'wallowa',
	// 				'wasco',
	// 				'washington',
	// 				'wheeler',
	// 				'yamhill',
	// 				'clark',
	// 				'cowlitz',
	// 				'skamania',
	// 				'wahkiakum',
	// 			];
	// 			if (countiesORWA.includes(county.toLowerCase())) {
	// 				setIsValidCounty(true);
	// 			} else {
	// 				setIsValidCounty(false);
	// 			}
	// 		});
	// };

	// const goBehavior = async () => {
	// 	await countyAPICall();
	// 	await setDoValidation(true);
	// 	await setDoValidation(false);
	// };

	const isPageDataValid = () => {
		// console.log(validCounty(fieldSelectorContext.county).valid);
		// console.log(validGender(fieldSelectorContext.gender).valid);
		// console.log(validAge(fieldSelectorContext.age).valid);
		// console.log(validZIP(fieldSelectorContext.zipCode).valid);
		// console.log(validFamilySize(fieldSelectorContext.familySize).valid);
		return (
			validCounty(fieldSelectorContext.county).valid &&
			validGender(fieldSelectorContext.gender).valid &&
			validAge(fieldSelectorContext.age).valid &&
			validZIP(fieldSelectorContext.zipCode).valid &&
			validFamilySize(fieldSelectorContext.familySize).valid
		);
	};

	useEffect(() => {
		// console.log('trigger useEffect1');
		callAPI();
		if (JSON.parse(localStorage.getItem('fsContext'))) {
			const age = JSON.parse(localStorage.getItem('fsContext')).age;
			const familySize = JSON.parse(localStorage.getItem('fsContext'))
				.familySize;
			const zipcode = JSON.parse(localStorage.getItem('fsContext')).zipCode;
			const county = JSON.parse(localStorage.getItem('fsContext')).county;
			const gender = JSON.parse(localStorage.getItem('fsContext')).gender;
			const categorySelected = JSON.parse(localStorage.getItem('fsContext'))
				.categorySelected;
			const catID = JSON.parse(localStorage.getItem('fsContext')).categoryId;
			const serviceName = JSON.parse(localStorage.getItem('fsContext'))
				.serviceName;
			const buttonState = JSON.parse(localStorage.getItem('fsContext'))
				.buttonState;
			fieldSelectorContext.setAge(age);
			fieldSelectorContext.setFamilySize(familySize);
			fieldSelectorContext.setZipcode(zipcode);
			fieldSelectorContext.setCounty(county);
			fieldSelectorContext.setGender(gender);
			fieldSelectorContext.setCategorySelected(categorySelected);
			fieldSelectorContext.setCategoryId(catID);
			fieldSelectorContext.setServiceName(serviceName);
			fieldSelectorContext.setButtonState(buttonState);
		}
	}, []);

	useEffect(() => {
		const handleValidZip = async () => {
			if (validZIP(fieldSelectorContext.zipCode).valid) {
				console.log('trigger valid zipcode');
				await API.getCountyByZipCode({
					zip: fieldSelectorContext.zipCode,
				})
					.then((data) => {
						fieldSelectorContext.setCounty(data[0]['county']);/////////////////
						getAllPossibleCountiesByZip(fieldSelectorContext.zipCode);
					})
					.catch((err) => {
						// TODO: we'll probably want to take action here to resolve the error
						console.log(err);
					});
			}
		};

		handleValidZip();
	}, [fieldSelectorContext.zipCode]);

	if (apiDataContext.categories.length === 0 || isLoading) {
		return <img src={Spinner} style={{ width: '200px' }} />;
	}

	return (
		<div className={'field-selector ' + themeContext}>
			<SearchBar
				apiCategories={apiCategories}
				// goBehavior={goBehavior}
				isPageDataValid={isPageDataValid}
				setResources={props.setResources}
				handleIsLoading={handleIsLoading}
				handleServiceChange={handleServiceChange}
				serviceName={serviceName}
				categoryID={categoryID}
				categorySelected={categorySelected}
				age={age}
				familySize={familySize}
				zipCode={zipCode}
				county={county}
				gender={gender}
				buttonState={buttonState}
			/>

			<InputLabel label='Service'>
				<CategorySelector
					handleButtonStateChange={handleButtonStateChange}
					buttonState={buttonState}
				/>
			</InputLabel>

			<InputLabel label='Gender'>
				<ExclusiveOption
					items={['Male', 'Female', 'Trans Male', 'Trans Female']}
					validator={validGender}
					shouldValidate={doValidation}
				/>
			</InputLabel>

			<InputLabel label='Age'>
				<TextInput
					name='Age'
					value={fieldSelectorContext.age}
					filter={onlyNumbers}
					validator={validAge}
					placeholder='32'
					onChange={fieldSelectorContext.setAge}
					shouldValidate={doValidation}
				/>
			</InputLabel>

			<div id='zip-and-county'>
				<InputLabel label='ZIP'>
					<TextInput
						name='ZIP'
						value={fieldSelectorContext.zipCode}
						filter={onlyNumbers}
						validator={validZIP}
						placeholder='97333'
						onChange={fieldSelectorContext.setZipcode}
						shouldValidate={doValidation}
					/>
				</InputLabel>
				{fieldSelectorContext.possibleCounties ? (
					<InputLabel label='County'>
						<CountySelect
							name='County'
							value={fieldSelectorContext.county}
							validator={validCounty}
							onChange={fieldSelectorContext.setCounty}
							shouldValidate={doValidation}
							counties={fieldSelectorContext.possibleCounties}></CountySelect>
					</InputLabel>
				) : (
					<InputLabel label='County'>
						<TextInput
							name='County'
							value={fieldSelectorContext.county}
							validator={validCounty}
							placeholder='Multnomah'
							onChange={fieldSelectorContext.setCounty}
							shouldValidate={doValidation}
						/>
					</InputLabel>
				)}

				<InputLabel label='Family Size'>
					<TextInput
						name='famliysize'
						value={fieldSelectorContext.familySize}
						validator={validFamilySize}
						placeholder='How many people are in your family?'
						onChange={fieldSelectorContext.setFamilySize}
						shouldValidate={doValidation}
					/>
				</InputLabel>
			</div>

			<button id='your-location-button' onClick={findLocation}>
				Your location
			</button>

			<SubmitButton
				// goBehavior={goBehavior}
				isPageDataValid={isPageDataValid}
				handleIsLoading={handleIsLoading}
			/>
		</div>
	);
};

export default FieldSelector;
