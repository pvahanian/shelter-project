/* 
A component meant to allow the user to select only one specific option
from a row of options (should de-select any other active option when
pressed).
*/

import React from 'react';

class Square extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <button 
        className={this.props.selected ? 'pick':'not'}
        onClick={
          e => {this.props.onClick(e, this.props.name)}
        }
      >
        {this.props.name}
      </button>
    );
  }
}

Square.defaultProps = {selected: false};

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pick: ''};
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(event, name) {
    this.setState({pick: name})
  }

  render() {
    return (
      <div> 
        {
        this.props.items.map((item, i) => 
          <Square 
            selected={item===this.state.pick}
            key={i} 
            name={item}
            onClick={this.handleClick}
            />)
        }
      </div>
    );
  }
}

const names = ['Bob', 'Joe', 'Dave'];