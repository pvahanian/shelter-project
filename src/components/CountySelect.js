import React from 'react';
import {ThemeContext} from '../ThemeContext';
import '../Assets/CountySelect.scss';
import InvalidEntryMessage from './InvalidEntryMessage';

class ZipSelect extends React.Component {
  constructor(props) {
    super(props)
  }

  static contextType = ThemeContext
  invalidEntryMessage = ''
  valid = null

  validate() {
    if(!this.props.validator)
      return {valid: true, message: ''}

    let value = this.props.value
    let validEntryClass = ''
    let invalidEntryMessage = ''

    let validityObject = this.props.validator(value)

    this.valid = validityObject.valid

    if(validityObject.valid === false)
      this.invalidEntryMessage = validityObject.message

    if(validityObject.valid === true)
      this.invalidEntryMessage = ''
  }

  render () {
    let value = this.props.value
    let validEntryClass = ''

    if(this.valid === true)
      validEntryClass = 'valid-entry '
    if(this.valid === false)
      validEntryClass = 'invalid-entry '

    if(this.props.filter)
      value = this.props.filter(value)

    if(this.props.shouldValidate)
      this.validate()


    return (

      <select
      value = {value}
      id= {this.props.name.toLowerCase()+'input'}
      className= {'text-input' + validEntryClass + this.context + ' county-select'}
      //Needs ONCHANGE FIXED!!

      onChange >


        <option value = '' disabled selected>Choose your county:</option>
        <option>DropDown2</option>
        <option>DropDown3</option>
      </select>
    )
  }
}

export default ZipSelect;
