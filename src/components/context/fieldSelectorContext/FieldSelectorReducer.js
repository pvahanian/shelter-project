/** @format */

const FieldSelectorReducer = (state, action) => {
	switch (action.type) {
		case 'SET_SERVICE_NAME':
			return { ...state, serviceName: action.payload };
		case 'SET_BUTTON_STATE':
			return { ...state, buttonState: action.payload };
		case 'SET_CATEGORY_ID':
			return { ...state, categoryId: action.payload };
		case 'SET_CATEGORY_SELECTED':
			return { ...state, categorySelected: action.payload };
		case 'SET_GENDER':
			return { ...state, gender: action.payload };
		case 'SET_COUNTY':
			console.log('trigger set county', action.payload)
			return { ...state, county: action.payload };
		case 'SET_FAMILY_SIZE':
			return { ...state, familySize: action.payload };
		case 'SET_AGE':
			return { ...state, age: action.payload };
		case 'SET_ZIPCODE':
			return { ...state, zipCode: action.payload };
		case 'SET_POSSIBLE_COUNTIES':
			return { ...state, possibleCounties: action.payload };
		case 'SET_VALID_COUNTY':
			console.log('trigger valid county' , action.payload)
			return { ...state, validCounty: action.payload };
		case 'SET_DO_VALIDATION':
			console.log('trigger dovalidation')
			return { ...state, doValidation: action.payload };
		case 'SET_IS_COUNTY_VALID':
			return { ...state, isCountyValid: action.payload };
		case 'SET_IS_ZIP_CODE_VALID':
			return { ...state, isZipCodeValid: action.payload };



		default:
			return;
	}
};

export default FieldSelectorReducer;