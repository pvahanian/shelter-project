import React from 'react';
import '../Assets/TextInput.scss';

class TextInput extends React.Component {
  render() {
    let validEntryClass = ''
    if(this.props.validEntry === true)
      validEntryClass = 'good-entry'
    else if(this.props.validEntry === false)
      validEntryClass = 'bad-entry'
    else if(this.props.validEntry === null)
      validEntryClass = ''

    return(
      <div className='number-input-container'>
        <div className='number-input-label'>
          { this.props.name }
        </div>
        <input
          placeholder={this.props.placeholder}
          className={'number-input ' + validEntryClass } 
          onChange={this.props.onChange}
          type='text'
        />
        <div class={'underline ' + validEntryClass}></div>
      </div>
    );
  }
};

export default TextInput;
