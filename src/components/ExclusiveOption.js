/*
A component meant to allow the user to select only one specific option
from a row of options (should de-select any other active option when
pressed).
*/

import React from 'react';
import '../Assets/ExclusiveOption.scss';
import InvalidEntryMessage from './InvalidEntryMessage';


// Child component of ExclusiveGroup
class ExclusiveButton extends React.Component {
  render() {
    // For buttons with SVG images
    if(typeof(this.props.data) !== 'string') {
      // Assume object like {label, image} and build an SVG button
      return (
        <button
          className={'exclusive-button ' + (this.props.selected ? 'selected' : '')}  // changes CSS and appearance when an option is selected/deselected
          onClick={e => {this.props.onClick(e, this.props.data)}}    // changes the name of the pick in ExGroup's state.
        >
          <img src={this.props.data.image}>
          </img>
          {this.props.data.label}
        </button>
      )
    }


    return (
      <button
        className={'exclusive-button ' + (this.props.selected ? 'selected' : '')}  // changes CSS and appearance when an option is selected/deselected
        onClick={e => {this.props.onClick(e, this.props.data)}}    // changes the name of the pick in ExGroup's state.
      >
        {this.props.data}
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

  handleClick(event, data) {

    this.setState({selected: data})
    if(typeof(data) === 'string')
      this.props.onChange(data)
    else
      this.props.onChange(data.label)
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
        <div className='exclusive-group'>
          {
            this.props.items.map((item, i) =>
              <ExclusiveButton
                selected={typeof(item) === 'string' ? item===this.state.selected : item.label===this.state.selected.label}
                key={i}
                data={item}
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
