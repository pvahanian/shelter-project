import React from 'react';
import ExGroup from "./ExOpt.js";

class FieldSelector extends React.Component {
    render() {
        return(
        <div className={"FieldSelector"}>
            <ExGroup items={['Male', 'Female', 'Transgender Male', 'Transgender Female']}/>
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