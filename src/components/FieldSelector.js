import React from 'react';
import ExclusiveOption from "./ExclusiveOption";
<<<<<<< HEAD
import '../Assets/FieldSelector.scss';
=======
>>>>>>> 7752e0fb24bd71988fa988fd15ef85ed945406aa

class FieldSelector extends React.Component {
    render() {
        return(
        <div className={"field-selector"}>
            <ExclusiveOption items={['Male', 'Female', 'Transgender Male', 'Transgender Female']}/>
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
