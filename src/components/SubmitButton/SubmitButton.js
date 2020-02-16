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
      //sn : props.fieldSelectorState.service,
      st: 'c',
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
          props.setResources(await API.getResourceBySubCategory(obj))
          //props.handleZIPChange(await API.getCountyByZipCode(props.county))
          history.push("/info");
        }
    }

    return (
      <button type="button" onClick={handleClick}>
        Go
      </button>
    )
}
export default SubmitButton
