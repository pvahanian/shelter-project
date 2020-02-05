import React from 'react';
<<<<<<< HEAD:src/components/shelter_info.js
import '../Assets/shelter_info.scss';
=======
//import './shelterCard.scss';
>>>>>>> 4cf406a8d5804f8d683f4f142e3ff594f9982f23:src/components/shelterCard.js

const ShelterCard = ({ID, Name, Address, Website, Resources, Contact}) => (
    <div className="shelterCard">
        <h1 className="shelterName"> {Name} </h1>
        <h4 className="shelterAddress"> {Address} </h4>
        <p className="shelterWebsite"> <a>{Website}</a> </p>
        <h2 className="resources">Resources</h2>
        <ul className="resourcesList">
            <ResourceList Resources={Resources} />
        </ul>


    </div>

);


//Returns a list of the props
function ResourceList(props) {
    const resources = props.Resources;
    //console.log(resources); For debugging purposes only
    if(!resources) return [];

    return (
        resources.map((resource) =>
        <li>{resource}</li>
        ));
}

export default ShelterCard;
