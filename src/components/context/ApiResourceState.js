/** @format */

import React, { useReducer, useState, useEffect } from 'react';
import ApiResourceContext from './ApiResourceContext';
import APIwrapper from '../../APIWrapper'

const ApiResourceState = (props) => {
	//here we want to instantiate the APIwrapper class, and use it to make an api call to 211. then, we will put the return value into state, and provide it via the context.provider below.
const API = new APIwrapper(process.env.REACT_APP_211_API_KEY)
const [apiCategories, setApiCategories] = useState([])

useEffect( async () => {
const newApiCategoryData = await API.getCategories();
setApiCategories(newApiCategoryData)
}, [])
	return (
		<ApiResourceContext.Provider value={{
            test: 'this is a test of the context system',
			apiCategories
        }}>
			{props.children}
		</ApiResourceContext.Provider>
	);
};

export default ApiResourceState;
