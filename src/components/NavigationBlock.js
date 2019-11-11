import React from 'react';
import '../Assets/NavigationBlock.css';

class NavBlock extends React.Component {
  render() {
    return(
      <div className="nav-block">
        <h4>Navigation</h4>
        <a href="https://en.wikipedia.org/wiki/Mineral">Resources</a>
        <a href="https://en.wikipedia.org/wiki/Party">Events</a>
        <a href="https://en.wikipedia.org/wiki/Maya_calendar">Calendar</a>
        <a href="https://en.wikipedia.org/wiki/Greenpeace">Volunteer</a>
        <a href="https://en.wikipedia.org/wiki/Engineer">About Us</a>
        <a href="https://en.wikipedia.org/wiki/Smoke_signal">Contact Us</a>
      </div>
    );
  }
};

export default NavBlock;