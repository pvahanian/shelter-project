
import React, {useState, useEffect } from 'react';
import ApiResourceContext from './ApiResourceContext';
import APIwrapper from '../../APIWrapper'


//here, we create a component ffor the ApiResourcesState. it imports and returns the provider property on the ApiResourceContext object created in ApiResourceContext.js and imported here
const ApiResourceState = (props) => {
	//here we want to instantiate the APIwrapper class, and use it to make an api call to 211. then, we will put the return value into state, and provide it via the ApiResourceContext.Provider below.
const API = new APIwrapper(process.env.REACT_APP_211_API_KEY)
const [apiCategories, setApiCategories] = useState([])

//include a wrapper function for updating the state, and return it via the ApiResourceContext.Provider below
const removeOneFromCategories = () => {
	setApiCategories([...apiCategories.slice(0, apiCategories.length - 1)])
}

//once, after component has mounted, get the apiCategories and set them to state.
useEffect( async () => {
const newApiCategoryData = await API.getCategories();
setApiCategories(newApiCategoryData)
}, [])
	return (
		<ApiResourceContext.Provider value={{
            test: 'this is a test of the context system',
			apiCategories,
			removeOneFromCategories
        }}>
			{props.children}
		</ApiResourceContext.Provider>
	);
};

export default ApiResourceState;
