/** @format */

import React, { useReducer, useEffect } from 'react';
import FieldSelectorContext from './FieldSelectorContext';
import FieldSelectorReducer from './FieldSelectorReducer';
import APIWrapper from '../../../APIWrapper';

export const FieldSelectorState = (props) => {

	const api = new APIWrapper(process.env.REACT_APP_211_API_KEY);
	

	const initialState = {
        serviceName: '',
        buttonState: {
            category: '',
            subCat: [{ subCategory: '', subCatTerm: [{ sterm: '' }] }],
        },
        categoryId: '',
        categorySelected: '',
        county: '',
        zipcode: '',
        familySize: '',
        age: ''
	};

	const [state, dispatch] = useReducer(FieldSelectorReducer, initialState);

    const setServiceName = (serviceName) => {
        console.log(serviceName)
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
                zipCode: state.zipcode,
                setZipcode,
                familySize: state.familySize,
                setFamilySize,
                age: state.age,
                setAge
			}}>
			{props.children}
		</FieldSelectorContext.Provider>
	);
};

export default FieldSelectorState;