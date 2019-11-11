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
      <NavBar {...navbar} />
      <NavBlock />
      <FieldSelector />
      <ExclusiveOption items={exampleOptions} />
    </div>
  );
}

export default App;
