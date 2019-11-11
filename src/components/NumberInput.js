import React from 'react';
import '../Assets/NumberInput.scss';

class NumberInput extends React.Component {
  render() {
    return(
      <div className='number-input-container'>
        <div className='number-input-label'>
          { this.props.name }
        </div>
        <input
          className='number-input'
          onChange={this.props.onChange}
          type='text'
        />
      </div>
    );
  }
};

export default NumberInput;
