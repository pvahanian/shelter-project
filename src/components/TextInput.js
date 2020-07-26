import React from 'react';
import '../Assets/TextInput.scss';
import InvalidEntryMessage from './InvalidEntryMessage';
import {ThemeContext} from '../ThemeContext';

class TextInput extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
  
  static contextType = ThemeContext
  invalidEntryMessage = ''
  valid = null

  handleChange = (e) => {
    // console.log(e.currentTarget.value)
    let newValue = e.currentTarget.value
    if(this.props.filter)
      newValue = this.props.filter(newValue)
    this.props.onChange(newValue)
  }

  validate() {
      if(!this.props.validator)
      return {valid: true, message: ''}
    // console.log(this.props)
    let value = this.props.value
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
    let value = this.props.value
    let validEntryClass = ''
    // Find the correct validity class to add to our elements
    if(this.valid === true)
      validEntryClass = 'valid-entry '
    if(this.valid === false)
      validEntryClass = 'invalid-entry '

    // Apply filter to entry, if one exists
    if(this.props.filter)
      value = this.props.filter(value)

    // If we've been asked to validate, do it
    if(this.props.shouldValidate)
      this.validate()


    return(
      <>
        <input
          value={value}
          placeholder={this.props.placeholder}
          id={this.props.name.toLowerCase()+'-input'}
          className={'text-input ' + validEntryClass + this.context}
          onChange={this.handleChange}
          type='text'
        />
        <div className={'underline ' + validEntryClass + this.context}></div>
        <InvalidEntryMessage message={this.invalidEntryMessage} />
      </>
    );
  }
};

export default TextInput;
