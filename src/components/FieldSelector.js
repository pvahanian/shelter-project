import React from 'react';
import NavBlock from "./NavigationBlock";
import Footer from "./Footer";

class FieldSelector extends React.Component {
    render() {
        return(
        <div className={"FieldSelector"}>
            <div className={"GenderSelector"}>
                <div className={"Male"}>Male</div>
                <div className={"Female"}>Female</div>
                <div className={"Transgender Male"}>Transgender Male</div>
                <div className={"Transgender Female"}>Transgender Female</div>
            </div>
            <div className={"AgeSelector"}>
                <input type={"number"} value={"2"}/>
            </div>
            <div className={"Location"}>
                <p>Zip Code: <input type={"Number"}/></p>
                <a href={"google.com"}>Your location</a>
            </div>
            <div className={"Services"}>
            </div>
        </div>

        );
    }
}

export default FieldSelector;