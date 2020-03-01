
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
    let key_data = data.reduce((acc, currentCategory) => {
      let categoryName = currentCategory['category']
      let newObj = {};
      newObj[categoryName] = currentCategory
      return Object.assign(acc, newObj)
      //{[currentData['category']] : currentData}
    }, {})
    console.log(data)
    return data
  }

//TODO: This function will have to loop/map to different shelter info components or shelter info maps them
  async getResource(obj){
    let parameters = {...this.credentials,...obj}
    console.log(JSON.stringify(parameters))
    let response = await fetch(
        `https://www.navigateopen.info/pubres/api/ServiceProviders/?ip=${JSON.stringify(parameters)}`
    )
    response = response.json()
    console.log(response)
    return response
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
