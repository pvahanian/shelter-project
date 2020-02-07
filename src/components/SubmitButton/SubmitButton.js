import React from 'react';
import './SubmitButton.css';
import { useHistory } from "react-router-dom";
import APIWrapper from '../../APIWrapper.js';


function SubmitButton(props) {

    let history = useHistory();
    const APIKey = process.env.REACT_APP_211_API_KEY
    const API = new APIWrapper(APIKey)


    async function handleClick() {
      await props.goBehavior();
        if(props.isPageDataValid()){
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
