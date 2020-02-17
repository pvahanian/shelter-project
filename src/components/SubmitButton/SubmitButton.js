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
      sn : props.fieldSelectorState.service,
      st: 'sc',
      age: Number(props.fieldSelectorState.age),
      gender: props.fieldSelectorState.gender,
      zip: Number(props.fieldSelectorState.zip),
      county: props.fieldSelectorState.county,
      catID: props.fieldSelectorState.catID
    }

    async function handleClick() {
      await props.goBehavior();
        if(props.isPageDataValid()){
          console.log(props.fieldSelectorState)
          //props.setResources(await API.getResourceByCategory(obj))
          //props.handleZIPChange(await API.getCountyByZipCode(props.county))
          //history.push("/info");
          let resourcesArray = []
          let i = 0;
          for(const service of props.apiCategories){
            let categoryResources = {};

            categoryResources['name'] = service['name']
            obj['st'] = 'c'
            obj['catID'] = props.apiCategories[i]['categoryID']
            //categoryResources['resources'] = await API.getResourceByCategory(obj);
              for(const subService of props.apiCategories[i]['subcat']){
                categoryResources[service['name']]['subCategory'] = subService['name']
              }
            i++;
            resourcesArray.push(categoryResources)
          }
          console.log(resourcesArray)
        }
    }

    return (
      <button type="button" onClick={handleClick}>
        Go
      </button>
    )
}
export default SubmitButton
