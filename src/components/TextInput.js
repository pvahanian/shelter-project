import React from 'react';
import '../Assets/TextInput.scss';

class TextInput extends React.Component {
  render() {
    return(
      <div className='number-input-container'>
        <div className='number-input-label'>
          { this.props.name }
        </div>
        <input
          value={this.props.value}
          className='number-input'
          onChange={this.props.onChange}
          type='text'
        />
        <div class='underline'></div>
      </div>
    );
  }
};

export default TextInput;
