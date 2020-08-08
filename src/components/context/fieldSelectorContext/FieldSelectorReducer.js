/** @format */

const FieldSelectorReducer = (state, action) => {
	switch (action.type) {
		case 'SET_SERVICE_NAME':
			return { ...state, serviceName: action.payload };
		case 'SET_BUTTON_STATE':
			return { ...state, buttonState: action.payload };
		default:
			return;
	}
};

export default FieldSelectorReducer;