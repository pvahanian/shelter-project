import React from 'react';
import '../Assets/InputLabel.scss'


class InputLabel extends React.Component {
  render() {
    return(
      <div
        id={this.props.label.toLowerCase() + '-input-container'}
        className='input-container'
      >
        <div
          id={this.props.label.toLowerCase() + '-input-label'}
          className='input-label'
        >
          { this.props.label }
        </div>
        {this.props.children}
      </div>
    );
  }
};

export default InputLabel;
