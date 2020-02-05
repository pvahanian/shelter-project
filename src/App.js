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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Shelter from './components/shelter_info'


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

  state = {
    themeColor: 'light',
    sessionID: null,
    categories: []
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state.themeColor}>
      <Router>
        <div className={'app ' + this.state.themeColor }>
          <div id='left-gutter-container'>
            <button onClick={e => this.setState({
              themeColor: this.state.themeColor === 'light' ? 'dark' : 'light'
            })}>
              Swap Theme
            </button>

            Left Gutter
          </div>

          <div id='main-container'>
            Main Container
            <Route
              exact path="/"
            >
              <FieldSelector changeAPIData={this.handleApiDataChange}/>
            </Route>

            <Route
              path="/info"
            >
              <Shelter appProps={this.state}/>
            </Route>
          </div>

          <div id='right-gutter-container'>
            Right Gutter
          </div>
        </div>
        </Router>
      </ThemeContext.Provider>
    );
  }
}

export default App;
