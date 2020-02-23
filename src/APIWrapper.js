
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
    let d3Obj = this.createD3Obj(data)

    //saveData(d3Obj, '211_categories.json')
    return d3Obj
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
    let data = {
      st: 'sc',
      catID: obj['catID'],
      zip: obj['zip'],
      incdet:1
    }
    let parameters = {...this.credentials,...data}
    console.log(JSON.stringify(parameters))

    try{
      let response = await fetch(
          `https://www.navigateopen.info/pubres/api/ServiceProviders/?ip=${JSON.stringify(parameters)}`
      )
      return await response.json()
    }
    catch(err){
      let error = {
        name: "None",

      }
      console.log(err)
      return JSON.stringify(error)
    }
  }

  async getResourceByServiceTerm(obj){
    var data = {
      st: 's',
      sn: obj['sn'],
      zip: obj['zip']
    }
    let parameters = {...this.credentials,...obj}
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
  createD3Obj(array){
   let objArray = [];
     for(const item of array){
       let obj = {};
       obj['name'] = item['category'];
       obj['category'] = item['category'];
       obj['children'] = item['subcat'];
       obj['subcat'] = item['subcat'];
       obj['categoryID'] = item['categoryID'];
       for(const subcat of obj['children']){
         subcat['name'] = subcat['subcategory']
         subcat['children']= subcat['subcatterm'];
         subcat['subcatterm'] = subcat['subcatterm'];
         for(const sterm of subcat['children']){
           sterm['name'] = sterm['sterm'];
         }
       }
       objArray.push(obj)
     }
    /*
  downloadCategories(data, fileName){
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        var json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
  }*/
   console.log(objArray)
   return objArray
 }



}

export default APIWrapper;
