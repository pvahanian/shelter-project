import React from "react";
import ShelterCard from "./shelterCard";
import PropTypes from "prop-types";

const Shelters = ({ shelters }) => (
  <div>
    <h1> Relevant Shelters </h1>
    <ul className="shelterList">
      {shelters &&
        shelters.map((shelter) => {
          return (
            <li key={shelter.Id}>
              <ShelterCard {...shelter} />
            </li>
          );
        })}
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
  ),
};

Shelters.defaultProps = {
  shelters: [],
};
