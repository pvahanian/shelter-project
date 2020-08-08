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
        }
	};

	const [state, dispatch] = useReducer(FieldSelectorReducer, initialState);

	console.log(state);

    const setServiceName = (serviceName) => {
        console.log(serviceName)
        dispatch({type: 'SET_SERVICE_NAME', payload: serviceName })
    }
    const setButtonState = (newState) => {
        dispatch({type: 'SET_BUTTON_STATE', payload: newState })
    }





	return (
		<FieldSelectorContext.Provider
			value={{
                serviceName: state.serviceName,
                setServiceName
			}}>
			{props.children}
		</FieldSelectorContext.Provider>
	);
};

export default FieldSelectorState;