
import React, { useState, useEffect, useContext } from 'react';
import ExclusiveOption from './ExclusiveOption';
import TextInput from './TextInput';
import '../Assets/FieldSelector.scss';
import { ThemeContext } from '../ThemeContext';
import APIWrapper from '../APIWrapper.js';
import InputLabel from './InputLabel';
import SubmitButton from './SubmitButton/SubmitButton.js';
import CategorySelector from './categorySelector/categorySelector.js';
import CountySelect from './CountySelect';
import Spinner from '../Assets/spinner.gif';
import SearchBar from './SearchBar/SearchBar';
import ApiDataContext from './context/apiData/ApiDataContext';
import FieldSelectorContext from './context/fieldSelectorContext/FieldSelectorContext';

const APIKey = process.env.REACT_APP_211_API_KEY;
const API = new APIWrapper(APIKey);

const FieldSelector = (props) => {
	const themeContext = useContext(ThemeContext);
	const fieldSelectorContext = useContext(FieldSelectorContext);
	const apiDataContext = useContext(ApiDataContext);

	async function callAPI() {
		await API.initialize();
	}

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

	const getAllPossibleCountiesByZip = async (zip) => {
		fieldSelectorContext.setZipcode(zip); 
		if (fieldSelectorContext.setIsZipCodeValid(zip).valid) {
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

	const findLocation = () => {
		// // console.log(
		// "Then we'd try to find their location using a Google API. For now...";
		// // );
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

	//restores form state upon backwards navigation
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
			if (fieldSelectorContext.setIsZipCodeValid(fieldSelectorContext.zipCode).valid) {
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
				apiCategories={apiDataContext.categories}
				// isPageDataValid={isPageDataValid} // get it from context later
				setResources={apiDataContext.setResources}
				handleIsLoading={handleIsLoading}
				handleServiceChange={fieldSelectorContext.setService}
				serviceName={fieldSelectorContext.serviceName}
				categoryID={fieldSelectorContext.categoryID}
				categorySelected={fieldSelectorContext.categorySelected}
				age={fieldSelectorContext.age}
				familySize={fieldSelectorContext.familySize}
				zipCode={fieldSelectorContext.zipCode}
				county={fieldSelectorContext.county}
				gender={fieldSelectorContext.gender}
				buttonState={fieldSelectorContext.buttonState}
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
					validator={fieldSelectorContext.setIsValidGender}
				/>
			</InputLabel>

			<InputLabel label='Age'>
				<TextInput
					name='Age'
					value={fieldSelectorContext.age}
					filter={onlyNumbers}
					validator={fieldSelectorContext.setIsAgeValid}
					placeholder='32'
					onChange={fieldSelectorContext.setAge}
					shouldValidate={fieldSelectorContext.doValidation}
				/>
			</InputLabel>

			<div id='zip-and-county'>
				<InputLabel label='ZIP'>
					<TextInput
						name='ZIP'
						value={fieldSelectorContext.zipCode}
						filter={onlyNumbers}
						validator={fieldSelectorContext.setIsZipCodeValid}
						placeholder='97333'
						onChange={fieldSelectorContext.setZipcode}
						shouldValidate={fieldSelectorContext.doValidation}
					/>
				</InputLabel>
				{fieldSelectorContext.possibleCounties ? (
					<InputLabel label='County'>
						<CountySelect name='County'/>
					</InputLabel>
				) : (
					<InputLabel label='County'>
						<TextInput
							name='County'
							value={fieldSelectorContext.county}
							validator={fieldSelectorContext.setIsCountyValid}
							placeholder='Multnomah'
							onChange={fieldSelectorContext.setCounty}
							shouldValidate={fieldSelectorContext.doValidation}
						/>
					</InputLabel>
				)}

				<InputLabel label='Family Size'>
					<TextInput
						name='famliysize'
						value={fieldSelectorContext.familySize}
						validator={fieldSelectorContext.setIsFamilySizeValid}
						placeholder='How many people are in your family?'
						onChange={fieldSelectorContext.setFamilySize}
						shouldValidate={fieldSelectorContext.doValidation}
					/>
				</InputLabel>
			</div>

			<button id='your-location-button' onClick={findLocation}>
				Your location
			</button>

			<SubmitButton
				handleIsLoading={handleIsLoading}
			/>
		</div>
	);
};

export default FieldSelector;
