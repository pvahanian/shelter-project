/*
A component meant to allow the user to select only one specific option
from a row of options (should de-select any other active option when
pressed).
*/

import React from 'react';
import '../Assets/ExclusiveOption.scss';
import InvalidEntryMessage from './InvalidEntryMessage';


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


class ExclusiveGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected: this.props.default ? this.props.default : ''};
    this.handleClick = this.handleClick.bind(this);
  }

  valid = null
  invalidEntryMessage = ''

  handleClick(event, name) {
    this.setState({selected: name})
    this.props.onChange(name)
  }

  validate() {
    if(!this.props.validator)
      return {valid: true, message: ''}

    let value = this.state.selected
    let validEntryClass = ''
    let invalidEntryMessage = ''

    // Check if given value is valid
    let validityObject = this.props.validator(value)

    // Note the results for reference in the render
    this.valid = validityObject.valid
    console.log(value)
    console.log(this.valid)

    if(validityObject.valid === false)
      this.invalidEntryMessage = validityObject.message

    if(validityObject.valid === true)
      this.invalidEntryMessage = ''

  }

  render() {
    if(this.props.shouldValidate)
      this.validate()


    return (
      <div className='exclusive-group-container'>
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

        <InvalidEntryMessage message={this.invalidEntryMessage} />
      </div>
    );
  }
}


export default ExclusiveGroup;
