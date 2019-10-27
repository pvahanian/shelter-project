
class APIWrapper {

  constructor(APIKey) {
    this.parameters = {
      APIKey: APIKey
    }
  }

  async getSessionID() {
    await fetch(
      `https://www.navigateopen.info/pubres/api/GetSessionID/?ip={apikey: "${this.parameters.APIKey}"}`
    )
    .then((data) => {
      return data.json()
    })
  }

  async getCategories(obj) {
    await fetch(
      `https://www.navigateopen.info/pubres/api/GetCategories/?ip={sid: "${obj.sessionID}", apikey: "${obj.APIKey}"}`
    )
    .then((data) => {
      return data.json()
    })
  }



}

export default APIWrapper;
