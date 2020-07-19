/** @format */

import React, { useContext } from 'react';
import ApiResourceContext from './ApiResourceContext';

const ContextExample = () => {
	const apiResourceContext = useContext(ApiResourceContext);
	console.log(apiResourceContext.apiCategories)
	return (
		<div>
			<div>{apiResourceContext.test}</div>
			{apiResourceContext.apiCategories.map((arrayElement, index) => {
				return <div>{arrayElement.category} </div>
			})}
		</div>
	);
};

export default ContextExample;
