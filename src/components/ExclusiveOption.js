/*
A component meant to allow the user to select only one specific option
from a row of options (should de-select any other active option when
pressed).
*/

import React from 'react';
import '../Assets/ExclusiveOption.scss';

// Child component of Group used to structure and handle option buttons.
class ExclusiveButton extends React.Component {
  render() {
    return (
      <button
        className={'exclusive-button ' + (this.props.selected ? 'selected' : '')}  // changes CSS and appearance when an option is selected/deselected
        onClick={e => {this.props.onClick(e, this.props.name)}}    // changes the name of the pick in ExGroup's state.
      >
        {this.props.name}
      </button>
    );
  }
}

// Primary component, tracks information about selections
// and makes the
class ExclusiveGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected: this.props.default};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, name) {
    this.setState({selected: name})
  }

  render() {
    return (
      <div
        className='exclusive-group'
      >
        {
          this.props.items.map((item, i) =>
            <ExclusiveButton
              selected={item===this.state.selected}
              key={i}
              name={item}
              onClick={this.handleClick}
            />
          )
        }
      </div>
    );
  }
}


export default ExclusiveGroup;
