
class APIWrapper {

  constructor(APIKey) {
    this.credentials = {
      APIKey: APIKey
    }

    // Enums
    this.serviceType = {
      category: 'C',
      subCategory: 'SC',
      serviceName: 'S',
      LocationOrProviderName: 'N'
    }
  }

  async initialize() {
    let data = await this.getSessionID()
    this.credentials['sid'] = data[0]['session_id']
  }

  async getSessionID() {
    let response = await fetch(
      `https://www.navigateopen.info/pubres/api/GetSessionID/?ip={apikey: "${this.credentials.APIKey}"}`
    )
    let data = await response.json()
    return data
  }

  async getCategories() {
    let parameters = this.credentials

    let response = await fetch(
      `https://www.navigateopen.info/pubres/api/GetCategories/?ip=${JSON.stringify(parameters)}`
    )
    let data = await response.json()
    return data
  }

//TODO: This function will have to loop/map to different shelter info components or shelter info maps them
  async getResource(obj){
    let parameters = {...this.credentials,...obj}
    console.log(JSON.stringify(parameters))
    let response = await fetch(
        `https://www.navigateopen.info/pubres/api/ServiceProviders/?ip=${JSON.stringify(parameters)}`
    )
    return await response.json()
  }
  async getResourceByCategory(obj){
    var data = {
      st: 'c',
      catID: obj['catID'],
      zip: obj['zip']
    }
    let parameters = {...this.credentials,...data}
    console.log(JSON.stringify(parameters))
    let response = await fetch(
        `https://www.navigateopen.info/pubres/api/ServiceProviders/?ip=${JSON.stringify(parameters)}`
    )
    return await response.json()
  }

  async getResourceBySubCategory(obj){
    var data = {
      st: 'sc',
      catID: obj['catID'],
      zip: obj['zip']
    }
    let parameters = {...this.credentials,...data}
    console.log(JSON.stringify(parameters))
    let response = await fetch(
        `https://www.navigateopen.info/pubres/api/ServiceProviders/?ip=${JSON.stringify(parameters)}`
    )
    return await response.json()
  }

  async getCountyByZipCode(obj) {
    let parameters = {...obj, ...this.credentials}

    let response = await fetch(
      `https://www.navigateopen.info/pubres/api/GetCounty/?ip=${JSON.stringify(parameters)}`
    )
    let data = await response.json()
    return data
  }

  async getKeywords(obj) {
    let parameters = {...obj, ...this.credentials}

    let response = await fetch(
      `https://www.navigateopen.info/pubres/api/GetCategories/?ip=${JSON.stringify(parameters)}`
    )
    let data = await response.json()
    return data
  }

  async serviceNameSearch(obj) {
    let parameters = {...obj, ...this.credentials}

    let response = await fetch(
      `https://www.navigateopen.info/pubres/api/ServiceProviders/?ip=${JSON.stringify(parameters)}`
    )

    let data = await response.json()

    return data
  }

  async detailDrilldown(obj) {
    let parameters = {...obj, ...this.credentials}

    let response = await fetch(
      `https://www.navigateopen.info/pubres/api/ProviderDetail/?ip=${JSON.stringify(parameters)}`
    )
    let data = await response.json()
    return data
  }


}

export default APIWrapper;
