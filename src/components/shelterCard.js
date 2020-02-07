import React from 'react';
//import '../Assets/shelter_info.scss';

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
