import React from 'react';
import logo from './logo.svg';
import './App.css';
import FieldSelector from "./components/FieldSelector";
import NavBlock from "./components/NavigationBlock";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";


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


function App() {
  return (
    <div className="App">
      <NavBar {...navbar} />
      <NavBlock />
      <FieldSelector />
      <Footer />
    </div>
  );
}

export default App;
