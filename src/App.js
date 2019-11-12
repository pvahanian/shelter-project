import React, {PureComponent} from 'react';
import logo from './logo.svg';
import './App.scss';
import FieldSelector from "./components/FieldSelector";
import NavBlock from "./components/NavigationBlock";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import ExclusiveOption from "./components/ExclusiveOption";
import Section from './components/Section';
import { ThemeContext } from './ThemeContext';

const navbar = {};
navbar.brand =
  {linkTo: "#", text: "Portland Shelters"};
navbar.links = [
  {linkTo: "#", text: "Contact Us"},
  {linkTo: "#", text: "How many links do we need?"},
  {dropdown: false, text: "Do we want a Dropdown?", links: [
    {linkTo: "#", text: "Dropdown Link 1"},
    {linkTo: "#", text: "Dropdown Link 2"}
  ]}
];

const exampleOptions = ['One 1', 'Two 2', 'Three 3'];

function App() {
  return (
    <ThemeContext.Provider value='light'>
      <div className='App'>
        <div id='left-gutter-container'>
          Text
        </div>

        <div id='main-container'>
          <FieldSelector />
        </div>

        <div id='right-gutter-container'>
          Text
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
