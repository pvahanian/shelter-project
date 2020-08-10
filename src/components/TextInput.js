/** @format */

import React, { useContext } from 'react';
import '../Assets/TextInput.scss';
import InvalidEntryMessage from './InvalidEntryMessage';
import { ThemeContext } from '../ThemeContext';
import FieldSelectorContext from '../components/context/fieldSelectorContext/FieldSelectorContext';

const TextInput = (props) => {
	const fieldSelectorContext = useContext(FieldSelectorContext);
	const themeContext = useContext(ThemeContext);
	let invalidEntryMessage = '';
	let valid = null;

	const handleChange = (e) => {
		// console.log(e.currentTarget.value)
		let newValue = e.currentTarget.value;
		if (props.filter) newValue = props.filter(newValue);
		console.log(newValue);
		props.onChange(newValue);
	};

	const validate = () => {
		console.log('trigger validate');
		if (!props.validator) return { valid: true, message: '' };
		let value = props.value;
		let validEntryClass = '';
		let invalidEntryMessage = '';

		// Check if given value is valid
		// let validityObject = props.validator(value)
		let validityObject = FieldSelectorContext.setIsCountyValid(value);
		console.log(validityObject);

		// Note the results for reference in the render
		const valid = validityObject.valid;

		if (validityObject.valid === false)
			invalidEntryMessage = validityObject.message;

		if (validityObject.valid === true) invalidEntryMessage = '';
	};

	let value = props.value;
	let validEntryClass = '';
	// Find the correct validity class to add to our elements
	if (valid === true) validEntryClass = 'valid-entry ';
	if (valid === false) validEntryClass = 'invalid-entry ';

	// Apply filter to entry, if one exists
	if (props.filter) value = props.filter(value);

	// If we've been asked to validate, do it
	// if(props.shouldValidate)
	// console.log(fieldSelectorContext);
	if (fieldSelectorContext.doValidation) validate();

	return (
		<>
			<input
				value={value}
				placeholder={props.placeholder}
				id={props.name.toLowerCase() + '-input'}
				className={'text-input ' + validEntryClass + themeContext}
				onChange={handleChange}
				type='text'
			/>
			<div className={'underline ' + validEntryClass + themeContext}></div>
			<InvalidEntryMessage message={invalidEntryMessage} />
		</>
	);
};

export default TextInput;
