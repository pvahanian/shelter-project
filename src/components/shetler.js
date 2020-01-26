import React from 'react'
import ShelterCard from './shelterCard'
import PropTypes from "prop-types"

const Shelters = ({ shelters }) => (
  <div style={{margin: '0,auto'}}>
    <h1> Relevant Shelters </h1>
    <ul className="shetlerList" style={{listStyleType: 'none'}}>
      {shelters && shelters.map(shelter => (
        <li key={shelter.Id} style={{border: '1px solid black', padding: "0 0 10px 0"}}>
          <ShelterCard {...shelter} />
        </li>
      ))}
    </ul>
  </div>
);

export default Shelters;

Shelters.propTypes = {
  shelters: PropTypes.arrayOf(
    PropTypes.shape({
      Id: PropTypes.number,
      Name: PropTypes.string,
      Address: PropTypes.string,
      Website: PropTypes.string,
      Resources: PropTypes.arrayOf(PropTypes.string),
      Contact: PropTypes.string,
    })
  )
};

Shelters.defaultProps = {
  shelters: []
};