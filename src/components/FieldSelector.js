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
const CensusAPIKey = process.env.REACT_APP_CENSUS_API_KEY;

const APIKey = process.env.REACT_APP_211_API_KEY;
const API = new APIWrapper(APIKey);

const FieldSelector = (props) => {
	// console.log('fieldSelectorProps: ', props);
	const themeContext = useContext(ThemeContext);

	const [apiCategories, setApiCategories] = useState([]);

	async function callAPI() {
		await API.initialize();
		setApiCategories(await API.getCategories());
	}

	const [categorySelected, setCategorySelected] = useState('');
	const handleCategorySelected = (category) => {
		// console.log(category);
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
		// console.log(service);
		setServiceName(service);
	};

	const [categoryID, setCategoryID] = useState('');
	const handleCatIDChange = (catID) => {
		// console.log(catID);
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
		setZipCode(zip); // redundent?
		if (validZIP(zip).valid) {
			await API.getCountyByZipCode({
				zip: zipCode,
			}).then((data) => {
				setPossibleCounties(
					Object.values(data).map((value) => {
						return value['county'];
					})
				);
			});
		}

		// if (fieldSelectorState.zip.length < 6) {
		// 	setFieldSelectorState({ ...fieldSelectorState, possibleCounties: '' });
		// }
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
		// console.log(county);
		// console.log(isValidCounty);
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
			"Then we'd try to find their location using a Google API. For now..."
		// );
		setZipCode('97206');
		setCounty('Clackamas');
	};

	const onlyNumbers = (str) => {
		let characterArray = str.split('');
		let numberArray = characterArray.filter(
			(character) => '0123456789'.indexOf(character) !== -1
		);
		return numberArray.join('');
	};

	const countyAPICall = async () => {
		await fetch(
			/*https://cors-anywhere.herokuapp.com/ need to be removed for production. For testing purposes in localhost
      this proxy prevents cors errors from being thrown by chrome. When the project is hosted somewhere, these errors
      won't be an issue.*/
			`https://cors-anywhere.herokuapp.com/https://api.census.gov/data/timeseries/poverty/saipe?get=NAME&for=county:*&in=state:41,53&time=2018&key=${CensusAPIKey}`,
			{
				crossDomain: true,
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			}
		)
			.then((result) => {
				return result.json();
			})
			.then((data) => {
				const countiesORWA = [];
				data.forEach((el) =>
					countiesORWA.push(
						el[0].toLowerCase().split('').reverse().slice(7).reverse().join('')
					)
				);
				countiesORWA.shift();
				if (countiesORWA.includes(county.toLowerCase())) {
					setIsValidCounty(true);
				} else {
					setIsValidCounty(false);
				}
			})
			//Hardcoding here is a backup list of all counties serviced in case api fails.
			.catch((err) => {
				const countiesORWA = [
					'baker',
					'benton',
					'clackamas',
					'clatsop',
					'columbia',
					'coos',
					'crook',
					'curry',
					'deschutes',
					'douglas',
					'gilliam',
					'grant',
					'harney',
					'hood river',
					'jackson',
					'jefferson',
					'josephine',
					'klamath',
					'lake',
					'lane',
					'lincoln',
					'linn',
					'malheur',
					'marion',
					'morrow',
					'multnomah',
					'polk',
					'sherman',
					'tillamook',
					'umatilla',
					'union',
					'wallowa',
					'wasco',
					'washington',
					'wheeler',
					'yamhill',
					'clark',
					'cowlitz',
					'skamania',
					'wahkiakum',
				];
				if (countiesORWA.includes(county.toLowerCase())) {
					setIsValidCounty(true);
				} else {
					setIsValidCounty(false);
				}
			});
	};

	const goBehavior = async () => {
		await countyAPICall();
		await setDoValidation(true);
		await setDoValidation(false);
	};

	const isPageDataValid = () => {
		// console.log(validCounty(county).valid);
		return (
			validCounty(county).valid &&
			validGender(gender).valid &&
			validAge(age).valid &&
			validZIP(zipCode).valid &&
			validFamilySize(familySize).valid
		);
	};

	useEffect(() => {
		// console.log('trigger useEffect1');
		callAPI();
		if (JSON.parse(localStorage.getItem('submitButtonProps'))) {
			// console.log(JSON.parse(localStorage.getItem('submitButtonProps')));
			const age = JSON.parse(localStorage.getItem('submitButtonProps')).age;
			const familySize = JSON.parse(localStorage.getItem('submitButtonProps'))
				.familySize;
			const zipCode = JSON.parse(localStorage.getItem('submitButtonProps'))
				.zipCode;
			const county = JSON.parse(localStorage.getItem('submitButtonProps'))
				.county;
			const gender = JSON.parse(localStorage.getItem('submitButtonProps'))
				.gender;
			const categorySelected = JSON.parse(
				localStorage.getItem('submitButtonProps')
			).categorySelected;
			const catID = JSON.parse(localStorage.getItem('submitButtonProps')).catID;
			const serviceName = JSON.parse(localStorage.getItem('submitButtonProps'))
				.serviceName;
			const buttonState = JSON.parse(localStorage.getItem('submitButtonProps'))
				.buttonState;
			handleAgeChange(age);
			handleFamilySizeChange(familySize);
			handleZIPChange(zipCode);
			handleCountyChange(county);
			handleGenderChange(gender);
			handleCategorySelected(categorySelected);
			handleCatIDChange(catID);
			handleServiceChange(serviceName);
			handleButtonStateChange(buttonState);
		}
	}, []);

	useEffect(() => {
		// console.log('trigger useEffect2');
		const handleValidZip = async () => {
			if (validZIP(zipCode).valid) {
				// console.log('trigger valid zipcode');
				await API.getCountyByZipCode({
					zip: zipCode,
				})
					.then((data) => {
						setCounty(data[0]['county']);
						getAllPossibleCountiesByZip(zipCode);
					})
					.catch((err) => {
						// TODO: we'll probably want to take action here to resolve the error
						// console.log(err);
					});
			}
		};

		handleValidZip();
	}, [zipCode]);

	if (apiCategories.length === 0 || isLoading) {
		return <img src={Spinner} style={{ width: '200px' }} />;
	}

	return (
		<div className={'field-selector ' + themeContext}>
			<SearchBar
				apiCategories={apiCategories}
				goBehavior={goBehavior}
				changeAPIData={props.changeAPIData}
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
					onChange={handleServiceChange}
					handleButtonStateChange={handleButtonStateChange}
					buttonState={buttonState}
					apiCategories={apiCategories}
					handleCatIDChange={handleCatIDChange}
					handleCategorySelected={handleCategorySelected}
					categorySelected={categorySelected}
					catID={categoryID}
				/>
			</InputLabel>

			<InputLabel label='Gender'>
				<ExclusiveOption
					items={['Male', 'Female', 'Trans Male', 'Trans Female']}
					validator={validGender}
					shouldValidate={doValidation}
					onChange={handleGenderChange}
				/>
			</InputLabel>

			<InputLabel label='Age'>
				<TextInput
					name='Age'
					value={age}
					filter={onlyNumbers}
					validator={validAge}
					placeholder='32'
					onChange={handleAgeChange}
					shouldValidate={doValidation}
				/>
			</InputLabel>

			<div id='zip-and-county'>
				<InputLabel label='ZIP'>
					<TextInput
						name='ZIP'
						value={zipCode}
						filter={onlyNumbers}
						validator={validZIP}
						placeholder='97333'
						onChange={handleZIPChange}
						shouldValidate={doValidation}
					/>
				</InputLabel>

				{possibleCounties ? (
					<InputLabel label='County'>
						<CountySelect
							name='County'
							value={county}
							validator={validCounty}
							onChange={handleCountyChange}
							shouldValidate={doValidation}
							counties={possibleCounties}></CountySelect>
					</InputLabel>
				) : (
					<InputLabel label='County'>
						<TextInput
							name='County'
							value={county}
							validator={validCounty}
							placeholder='Multnomah'
							onChange={handleCountyChange}
							shouldValidate={doValidation}
						/>
					</InputLabel>
				)}

				<InputLabel label='Family Size'>
					<TextInput
						name='famliysize'
						value={familySize}
						validator={validFamilySize}
						placeholder='How many people are in your family?'
						onChange={handleFamilySizeChange}
						shouldValidate={doValidation}
					/>
				</InputLabel>
			</div>

			<button id='your-location-button' onClick={findLocation}>
				Your location
			</button>

			<SubmitButton
				goBehavior={goBehavior}
				changeAPIData={props.changeAPIData}
				isPageDataValid={isPageDataValid}
				setResources={props.setResources}
				apiCategories={apiCategories}
				handleIsLoading={handleIsLoading}
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
		</div>
	);
};

export default FieldSelector;
