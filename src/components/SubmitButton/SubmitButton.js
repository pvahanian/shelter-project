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
    st: '',
    age: Number(props.fieldSelectorState.age),
    gender: props.fieldSelectorState.gender,
    zip: Number(props.fieldSelectorState.zip),
    county: props.fieldSelectorState.county,
    catid: props.fieldSelectorState.catID
  }
  
  async function handleClick() {
    props.handleIsLoading()
      await props.goBehavior();
        if(props.isPageDataValid()){
          console.log(props.fieldSelectorState)
          //save field selector state to local storage for use if / when user navigates backwards
          localStorage.setItem('fieldSelectorState', JSON.stringify(props.fieldSelectorState))
          //props.setResources(await API.getKeywords(obj))
          history.push("/info");

          //If category selected
            //Make getResource call with category data
          //If subCategory selected
            ////Make getResource call with subCategory data
          //If subestCategory selected
            ////Make getResource call with service name data

          console.log(props.categorySelected)
          if(props.categorySelected === 3){
            obj['st'] = 's'
            console.log(obj)
            console.log(props.categorySelected)
            props.setResources(await API.getResource(obj))
          }
          else if(props.categorySelected === 2){
            obj['st'] = 'sc'
            obj['sn'] = ''
            console.log(obj)
            props.setResources(await API.getResource(obj))
          }
          else{
            obj['st'] = 'c'
            obj['sn'] = ''
            console.log(obj)
            props.setResources(await API.getResource(obj))
          }

        }
        props.handleIsLoading()
    }

    return (
      <button type="button" onClick={handleClick}>
        Go
      </button>
    )
}
export default SubmitButton
