import React from 'react';
import './Footer.css';

class Footer extends React.Component {
  render() {
    return (

      <button
        onClick={() => alert('Hello there!')}
      >
        {'I am a Footer! Click me!'}
      </button>
    );
  }
}

export default Footer;