import React from 'react';
import '../Assets/TextInput.scss';

class TextInput extends React.Component {
  constructor(props) {
    super(props)
  }

  invalidEntryMessage = ''
  valid = null


  validate() {
    if(!this.props.validator)
      return {valid: true, message: ''}

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
      validEntryClass = 'valid-entry'
    if(this.valid === false)
      validEntryClass = 'invalid-entry'

    // Apply filter to entry, if one exists
    if(this.props.filter)
      value = this.props.filter(value)

    // If we've been asked to validate, do it
    if(this.props.shouldValidate) {
      let validityObject = this.validate()
      console.log(validityObject)
    }


    return(
      <div className={'number-input-container ' + validEntryClass}>
        <div className='number-input-label'>
          { this.props.name }
        </div>
        <input
          value={value}
          placeholder={this.props.placeholder}
          className={'number-input ' + validEntryClass}
          onChange={ e => {
              let newValue = e.currentTarget.value
              if(this.props.filter)
                newValue = this.props.filter(newValue)
              this.props.onChange(newValue)
            }
          }
          type='text'
        />
        <div class={'underline ' + validEntryClass}></div>
        <div class='invalid-entry-message'>
          {this.invalidEntryMessage}
        </div>
      </div>
    );
  }
};

export default TextInput;
