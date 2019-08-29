import React from 'react';
import './Footer.css';
//import ReactDOM from 'react-dom';
const listOfLinks = (
  <ul>
    <a href="https://en.wikipedia.org/wiki/Parrot">Services(parrot)</a>
    <a href="https://en.wikipedia.org/wiki/Mantis_shrimp">Contact Us(mantis shrimp)</a>
    <a href="https://en.wikipedia.org/wiki/Gecko">Legal(gecko)</a>
  </ul>
);

class Footer extends React.Component {
  render() {
    return(
      <footer>
        Sneaky lil' Footer
        {listOfLinks}
      </footer>
    );
  }
};

//ReactDOM.render(<Footer />, document.getElementById('app'));
export default Footer;