import React from 'react';
import { action } from '@storybook/addon-actions';
import Navbar from '../components/Navbar';

export default {
  title: 'Navbar',
};


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

export const standard = () => <Navbar {...navbar} />;
