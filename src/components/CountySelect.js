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
//Does this need validation, being we are already pulling the information from an API?

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
      onChange= {e => {
          let newValue = e.currentTarget.value
          if(this.props.filter)
            newValue = this.props.filter(newValue)
          this.props.onChange(newValue)
        }
      }
      counties = {this.props.counties}
      >
        <option value = '' disabled>Choose your county:</option>
        {this.props.counties.map((county,index) => {
          return (
            <option key = {index} value = {county}>{county}</option>
          )
        })}
      </select>
    )
  }
}

export default ZipSelect;
