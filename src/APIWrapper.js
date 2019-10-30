
class APIWrapper {

  constructor(APIKey) {
    this.parameters = {
      APIKey: APIKey
    }

    this.serviceType = {
      category: 'C',
      subCategory: 'SC',
      serviceName: 'S',
      LocationOrProviderName: 'N'
    }
  }

  async initialize() {
    let data = await this.getSessionID()
    this.parameters.sessionID = data[0]['session_id']
  }

  async getSessionID() {
    let response = await fetch(
      `https://www.navigateopen.info/pubres/api/GetSessionID/?ip={apikey: "${this.parameters.APIKey}"}`
    )
    let data = await response.json()
    return data
  }

  async getCategories() {
    let callParams = JSON.parse(JSON.stringify(this.parameters))

    let response = await fetch(
      `https://www.navigateopen.info/pubres/api/GetCategories/?ip=${JSON.stringify(callParams)}`
    )
    let data = await response.json()
    return data
  }

  async getCountyByZipCode(obj) {
    let callParams = JSON.parse(JSON.stringify(this.parameters))
    callParams = {...callParams, ...obj}

    let response = await fetch(
      `https://www.navigateopen.info/pubres/api/GetCounty/?ip=${JSON.stringify(callParams)}`
    )
    let data = await response.json()
    return data
  }

  async getKeywords(obj) {
    let callParams = JSON.parse(JSON.stringify(this.parameters))
    callParams = {...callParams, ...obj}

    let response = await fetch(
      `https://www.navigateopen.info/pubres/api/GetCategories/?ip=${JSON.stringify(callParams)}`
    )
    let data = await response.json()
    return data
  }

  async serviceNameSearch(obj) {
    let callParams = JSON.parse(JSON.stringify(this.parameters))
    callParams = {...callParams, ...obj}

    console.log(callParams)

    let response = await fetch(
      `https://www.navigateopen.info/pubres/api/ServiceProviders/?ip=${JSON.stringify(callParams)}`
    )

    let data = await response.json()
    return data
  }

  async detailDrilldown(obj) {
    let callParams = JSON.parse(JSON.stringify(this.parameters))
    callParams = {...callParams, ...obj}

    let response = await fetch(
      `https://www.navigateopen.info/pubres/api/ProviderDetail/?ip=${JSON.stringify(callParams)}`
    )
    let data = await response.json()
    return data
}



}

export default APIWrapper;
