/* 
A component meant to allow the user to select only one specific option
from a row of options (should de-select any other active option when
pressed).
*/

import React from 'react';
import '../Assets/ExOpt.css';

// Child component of Group used to structure and handle option buttons.
class ExButton extends React.Component {
/*
  constructor(props) {
    super(props);
  }
*/
 
  render() {
    return (
      <button 
        className={this.props.selected ? 'pick':'not'}  // changes CSS and appearance when an option is selected/deselected
        onClick={
          e => {this.props.onClick(e, this.props.name)} // changes the name of the pick in ExGroup's state.
        }
      >
        {this.props.name}
      </button>
    );
  }
}

// default properties for buttons in a group
// by default no options are selected.
ExButton.defaultProps = {selected: false};

// Primary component, tracks information about selections
// and makes the 
class ExGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pick: ''};
    this.handleClick = this.handleClick.bind(this);
  }

  // event handler passed down to ExButton so that ExGroup state can be changed
  // thought keeping track of the currently selected option would be useful
  // for database queries later.
  handleClick(event, name) {
    this.setState({pick: name}) // becuase we are calling setState, the ExGroup re-renders after this function runs in an ExButton.
  }

  render() {
    return (
      <div> 
        {
        this.props.items.map((item, i) => 
          <ExButton 
            selected={item===this.state.pick} //indicates if the button is selected or not
            key={i} 
            name={item}
            onClick={this.handleClick} //passing handleClick down to ExButton.
            />)
        }
      </div>
    );
  }
}

//const names = ['Bob', 'Joe', 'Dave']; //input array used for early testing.

export default ExGroup;