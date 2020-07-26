/** @format */

class APIWrapper {
	constructor(APIKey) {
		this.credentials = {
			APIKey: APIKey,
		};

		// Enums
		this.serviceType = {
			category: 'C',
			subCategory: 'SC',
			serviceName: 'S',
			LocationOrProviderName: 'N',
		};
	}

	async initialize() {
		//check localstorage for sessionId and if present, use it for credentials, otherwise, get new sessionId to use for credentials
		if (JSON.parse(localStorage.getItem('sessionId'))) {
			this.credentials['sid'] = localStorage.getItem('sessionId')[0].session_id;
			// console.log('sessionId set from localStorage')
			// console.log("API initalized")
		} else {
			// console.log('new sessionID')
			let data = await this.getSessionID();
			// console.log(data[0]['session_id'])
			this.credentials['sid'] = data[0]['session_id'];
			// console.log("API initalized")
		}
	}

	async getSessionID() {
		let response = await fetch(
			`https://www.navigateopen.info/pubres/api/GetSessionID/?ip={apikey: "${this.credentials.APIKey}"}`
		);
		let data = await response.json();
		// console.log("get SessionID called", data)
		//save sessionId in localstorage
		localStorage.setItem('sessionId', JSON.stringify(data));
		return data;
	}

	async getCategories() {
		let parameters = this.credentials;

		let response = await fetch(
			`https://www.navigateopen.info/pubres/api/GetCategories/?ip=${JSON.stringify(
				parameters
			)}`
		);
		let data = await response.json();
		// console.log(data)
		return data;
	}

	//TODO: This function will have to loop/map to different shelter info components or shelter info maps them
	async getResource(obj) {
		let parameters = { ...this.credentials, ...obj };
		// console.log(JSON.stringify(parameters))
		console.log('getResource', parameters);
		let response = await fetch(
			`https://www.navigateopen.info/pubres/api/ServiceProviders/?ip=${JSON.stringify(
				parameters
			)}`
		);
		//for DEBUGGING
		let jsonReturn = await response.json();
		console.log(jsonReturn);
		return jsonReturn;
	}

	async getCountyByZipCode(obj) {
		let parameters = { ...obj, ...this.credentials };
		console.log(parameters);
		let response = await fetch(
			`https://www.navigateopen.info/pubres/api/GetCounty/?ip=${JSON.stringify(
				parameters
			)}`
		);
		let data = await response.json();
		console.log(data);
		return data;
	}

	async getKeywords(obj) {
		let parameters = { ...obj, ...this.credentials };

		let response = await fetch(
			`https://www.navigateopen.info/pubres/api/GetCategories/?ip=${JSON.stringify(
				parameters
			)}`
		);
		let data = await response.json();
		return data;
	}

	async serviceNameSearch(obj) {
		let parameters = { ...obj, ...this.credentials };

		let response = await fetch(
			`https://www.navigateopen.info/pubres/api/ServiceProviders/?ip=${JSON.stringify(
				parameters
			)}`
		);

		let data = await response.json();

		return data;
	}

	async detailDrilldown(obj) {
		let parameters = { ...obj, ...this.credentials };

		let response = await fetch(
			`https://www.navigateopen.info/pubres/api/ProviderDetail/?ip=${JSON.stringify(
				parameters
			)}`
		);
		let data = await response.json();
		return data;
	}
}

export default APIWrapper;
