import React from 'react';
import './SubmitButton.css';
import { useHistory } from "react-router-dom";
import APIWrapper from '../../APIWrapper.js';


function SubmitButton(props) {

    let history = useHistory()
    const APIKey = process.env.REACT_APP_211_API_KEY
    const API = new APIWrapper(APIKey)
    API.initialize()
    let obj ={
      sn : props.fieldSelectorState.subsubService,
      st: 'sc',
      age: Number(props.fieldSelectorState.age),
      gender: props.fieldSelectorState.gender,
      zip: Number(props.fieldSelectorState.zip),
      county: props.fieldSelectorState.county,
      catID: props.fieldSelectorState.catID
    }

    async function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function getAllResources(){
      let resourcesArray = []
      for(const category of props.apiCategories){
        let categoryResources = {}
        categoryResources['name']= category['name']
        categoryResources['subcat'] = category['subcat']
        categoryResources['children'] = category['subcat']

        obj['st'] = 'c'
        obj['catID'] = category['categoryID']

        categoryResources['resources'] = await API.getResourceByCategory(obj)
        await sleep(5000)

          for(const subCategory of category['subcat']){
            obj['st'] = 'sc'
            obj['catID'] = subCategory['subcategoryID']
            subCategory['resources'] = await API.getResourceByCategory(obj)
            subCategory['children'] = subCategory['resources']
            await sleep(5000)

          }
        resourcesArray.push(categoryResources)
      }
      console.log(resourcesArray)
      var saveData = (function () {
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
      }());
      saveData(resourcesArray, '211-resources.json')
      return resourcesArray
    }
    async function handleClick() {
      await props.goBehavior()
        if(props.isPageDataValid()){
          console.log(props.fieldSelectorState)
          //props.setResources(await API.getResourceByCategory(obj))
          //props.handleZIPChange(await API.getCountyByZipCode(props.county))
          //history.push("/info");
          //let allResources = getAllResources()
          console.log(obj)
          obj['catID'] = props.fieldSelectorState.catID
          console.log(API.getResourceByCategory(obj))
        }
    }



    return (
      <button type="button" onClick={handleClick}>
        Go
      </button>
    )
}
export default SubmitButton
