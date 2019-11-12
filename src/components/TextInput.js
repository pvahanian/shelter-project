import React from 'react';
import '../Assets/TextInput.scss';

class TextInput extends React.Component {

  onChangeWrapper() {

  }

  validate() {
    if(!this.props.validator)
      return 'good-entry'

    let value = this.props.value
    console.log(value)

    // Check if given value is valid
    let validityObject = null
    if(this.props.validator) {
      validityObject = this.props.validator(value)
      console.log(validityObject)
    }

    // Find the correct validity class to add to our elements
    let validEntryClass = ''
    if(validityObject.valid === true)
      validEntryClass = 'valid-entry'
    if(validityObject.valid === false)
      validEntryClass = 'invalid-entry'

    return validEntryClass
  }


  render() {
    let value = this.props.value

    // Apply filter to entry, if one exists
    if(this.props.filter)
      value = this.props.filter(value)

    // If we've been asked to validate, do it
    let validEntryClass = this.props.shouldValidate ? this.validate() : ''

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
      </div>
    );
  }
};

export default TextInput;
