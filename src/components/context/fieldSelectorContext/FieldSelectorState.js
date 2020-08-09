/** @format */

import React, { useReducer, useEffect } from 'react';
import FieldSelectorContext from './FieldSelectorContext';
import FieldSelectorReducer from './FieldSelectorReducer';
import APIWrapper from '../../../APIWrapper';

export const FieldSelectorState = (props) => {

    const api = new APIWrapper(process.env.REACT_APP_211_API_KEY);
    const CensusAPIKey = process.env.REACT_APP_CENSUS_API_KEY;

	const initialState = {
        serviceName: '',
        buttonState: {
            category: '',
            subCat: [{ subCategory: '', subCatTerm: [{ sterm: '' }] }],
        },
        categoryId: '',
        categorySelected: '',
        county: '',
        zipCode: '',
        familySize: '',
        age: '',
        gender: '',
        possibleCounties: '',
        doValidation: '',
        validCounty: ''
	};

	const [state, dispatch] = useReducer(FieldSelectorReducer, initialState);

    const setServiceName = (serviceName) => {
        dispatch({type: 'SET_SERVICE_NAME', payload: serviceName })
    }
    const setButtonState = (newState) => {
        dispatch({type: 'SET_BUTTON_STATE', payload: newState })
    }
    const setCategoryId = (newId) => {
        dispatch({type: 'SET_CATEGORY_ID', payload: newId })
    }
    const setCategorySelected = (newCat) => {
        dispatch({type: 'SET_CATEGORY_SELECTED', payload: newCat })
    }
    const setGender = (newGender) => {
        dispatch({type: 'SET_GENDER', payload: newGender })
    }
    const setCounty = (newCounty) => {
        dispatch({type: 'SET_COUNTY', payload: newCounty})
    }
    const setZipcode = (newZip) => {
        dispatch({type: 'SET_ZIPCODE', payload: newZip})
    }
    const setFamilySize = (newFamSize) => {
        dispatch({type: 'SET_FAMILY_SIZE', payload: newFamSize})
    }
    const setAge = (newAge) => {
        dispatch({type: 'SET_AGE', payload: newAge})
    }
    const setPossibleCounties = (counties) => {
        dispatch({type: 'SET_POSSIBLE_COUNTIES', payload: counties })
    }
    const setDoValidation = (input) => {
        dispatch({type: 'SET_DO_VALIDATION', payload: input })
    }
    
    const setValidCounty = (input) => {
        dispatch({type: 'SET_VALID_COUNTY', payload: input})
    }

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
				console.log(countiesORWA)
				if (countiesORWA.includes(state.county.toLowerCase())) {
					setValidCounty(true);
				} else {
					setValidCounty(false);
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
				if (countiesORWA.includes(state.county.toLowerCase())) {
					setValidCounty(true);
				} else {
					setValidCounty(false);
				}
			});
	};

	const goBehavior = async () => {
		console.log('trigger go behavior')
		await countyAPICall()
		await setDoValidation(true)
		await setDoValidation(false)
	}

	return (
		<FieldSelectorContext.Provider
			value={{
                serviceName: state.serviceName,
                setServiceName,
                buttonState: state.buttonState,
                setButtonState,
                categoryId: state.categoryId,
                setCategoryId,
                categorySelected: state.categorySelected,
                setCategorySelected,
                gender: state.gender,
                setGender,
                county: state.county,
                setCounty,
                zipCode: state.zipCode,
                setZipcode,
                familySize: state.familySize,
                setFamilySize,
                age: state.age,
                setAge,
                possibleCounties: state.possibleCounties,
                setPossibleCounties,
                doValidation: state.doValidation,
                setDoValidation,
                validCounty: state.validCounty,
                setValidCounty,
                countyAPICall,
				goBehavior
			}}>
			{props.children}
		</FieldSelectorContext.Provider>
	);
};

export default FieldSelectorState;