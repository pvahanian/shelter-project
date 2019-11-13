import React, {PureComponent} from 'react';
import logo from './logo.svg';
import './App.scss';
import FieldSelector from "./components/FieldSelector";
import NavBlock from "./components/NavigationBlock";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import APIWrapper from "./APIWrapper.js";
import ExclusiveOption from "./components/ExclusiveOption";
import Section from './components/Section';
import { ThemeContext } from './ThemeContext';

const navbar = {};
navbar.brand = {linkTo: "#", text: "Portland Shelters"};
navbar.links = [
  {linkTo: "#", text: "Contact Us"},
  {linkTo: "#", text: "How many links do we need?"},
  {
    dropdown: false, text: "Do we want a Dropdown?",
    links: [
      {linkTo: "#", text: "Dropdown Link 1"},
      {linkTo: "#", text: "Dropdown Link 2"}
    ]
  }
];



const APIKey = process.env.REACT_APP_211_API_KEY
const API = new APIWrapper(APIKey)

class App extends React.Component {
  themeColor = 'light'

  state = {
    sessionID: null,
    categories: []
  }

  render() {
    return (
      <ThemeContext.Provider value={this.themeColor}>
        <div className={'app ' + this.themeColor }>
          <div id='left-gutter-container'>
            Left Gutter
          </div>

          <div id='main-container'>
            Main Container
            <FieldSelector />
          </div>

          <div id='right-gutter-container'>
            Right Gutter
          </div>
        </div>
      </ThemeContext.Provider>
    );
  }
}

export default App;
