class APIWrapper {
  constructor(APIKey) {
    this.credentials = {
      APIKey: APIKey,
    };

    // Enums
    this.serviceType = {
      category: "C",
      subCategory: "SC",
      serviceName: "S",
      LocationOrProviderName: "N",
    };
  }

  async initialize() {
    let data = await this.getSessionID();
    this.credentials["sid"] = data[0]["session_id"];
    // console.log("initialized",data[0], this.credentials);
  }

  async getSessionID() {
    let response = await fetch(
      `https://www.navigateopen.info/pubres/api/GetSessionID/?ip={apikey: "${this.credentials.APIKey}"}`
    );
    let data = await response.json();
    // console.log("here is the session id", data)
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
    // console.log("here are the categories", data);

    return data;
  }

  //TODO: This function will have to loop/map to different shelter info components or shelter info maps them
  async getResource(obj) {
    let parameters = { ...this.credentials, ...obj };
    // console.log(
    //   "here is the not stringified json object",
    //   parameters
    // );
    // console.log(
    //   "here is the stringified json object",
    //   JSON.stringify(parameters)
    // );
    let response = await fetch(
      `https://www.navigateopen.info/pubres/api/ServiceProviders/?ip=${JSON.stringify(
        parameters
      )}`
    );
    return await response.json();
  }

  async getCountyByZipCode(obj) {
    let parameters = { ...obj, ...this.credentials };

    let response = await fetch(
      `https://www.navigateopen.info/pubres/api/GetCounty/?ip=${JSON.stringify(
        parameters
      )}`
    );
    let data = await response.json();
    // console.log("here is the data from get county by zip:", data);

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
    // console.log("here is the data from detail get key words:", data);

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
    // console.log("here is the data from servicename serch:", data);
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
    // console.log("here is the data from detail drilldown:", data);

    return data;
  }
}

export default APIWrapper;
