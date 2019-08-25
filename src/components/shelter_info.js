import React from 'react';
import './shelter_info.scss';

const Shelter = ({Name, Address, Website, Resources, Contact}) => (
    <div className="shelterCard">
        <h1 className="shelterName"> {Name} </h1>
        <h4 className="shelterAddress"> {Address} </h4>
        <p className="shelterWebsite"> {Website} </p>
        <h2 className="resources">Resources</h2>
        <ul className="resourcesList">
            <ResourceList Resources={Resources} />
        </ul>


    </div>

);


//Returns a list of the props
function ResourceList(props) {
    const resources = props.Resources;
    console.log(resources);
    if(!resources) return [];
    const listItems = resources.map((resource) =>
        <li>{resource}</li>
    );
   return (
        <ul>{listItems}</ul>
    );
}

export default Shelter;
