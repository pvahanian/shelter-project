import React from "react";
import "./SubmitButton.css";
import { useHistory } from "react-router-dom";
import APIWrapper from "../../APIWrapper.js";

function SubmitButton(props) {
  let history = useHistory();
  const APIKey = process.env.REACT_APP_211_API_KEY;
  const API = new APIWrapper(APIKey);
  API.initialize();
  let obj = {
    sn: props.fieldSelectorState.service,
    st: "s",
    age: Number(props.fieldSelectorState.age),
    gender: props.fieldSelectorState.gender,
    zip: Number(props.fieldSelectorState.zip),
    county: props.fieldSelectorState.county,
    //catid: props.fieldSelectorState.catID
  };

  async function handleClick() {
    await props.goBehavior();
    if (props.isPageDataValid()) {
      //set fieldSelectorState object to localStorage on submit, for reference when user navigates backwards.. 
      localStorage.setItem(
        "fieldSelectorState",
        JSON.stringify(props.fieldSelectorState)
      );
      props.setResources(await API.getResource(obj));
      // props.setResources(await API.getKeywords(obj)) //this was the function call when I started working on this app. why I cannot say.
      history.push("/info");
    }
  }

  return (
    <button type="button" onClick={handleClick}>
      Go
    </button>
  );
}
export default SubmitButton;
