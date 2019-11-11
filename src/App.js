import React from 'react';
import logo from './logo.svg';
import './App.scss';
import FieldSelector from "./components/FieldSelector";
import NavBlock from "./components/NavigationBlock";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import ExclusiveOption from "./components/ExclusiveOption";


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
    <div className="App">
<<<<<<< HEAD
      <div id='left-gutter-container'>
        Text
      </div>

      <div id='main-container'>
        <FieldSelector />
        <ExclusiveOption id='temp' items={exampleOptions} />
      </div>

      <div id='right-gutter-container'>
        Text
      </div>
=======
      <NavBar {...navbar} />
      <NavBlock />
      <FieldSelector />
      <ExclusiveOption items={exampleOptions} />
>>>>>>> 7752e0fb24bd71988fa988fd15ef85ed945406aa
    </div>
  );
}

export default App;
