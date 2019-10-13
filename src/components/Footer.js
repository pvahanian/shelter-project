import React from 'react';
import '../Assets/Footer.css';
import NavBlock from './NavigationBlock.js';

const listOfLinks = (
  <ul>
    <a href="https://en.wikipedia.org/wiki/Parrot">Services(parrot)</a>
    <a href="https://en.wikipedia.org/wiki/Mantis_shrimp">Contact Us(mantis shrimp)</a>
    <a href="https://en.wikipedia.org/wiki/Gecko">Legal(gecko)</a>
  </ul>
);

const plainInfo = (
  <div>
    Organization, Address, Phone#
  </div>
);

class Footer extends React.Component {
  render() {
    return(
      <div>
        <footer>
          {plainInfo}
          {listOfLinks}
        </footer>
      </div>
    );
  }
};

export default Footer;