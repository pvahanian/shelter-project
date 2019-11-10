import React from 'react';
import logo from './logo.svg';
import './App.css';
import FieldSelector from "./components/FieldSelector";
import NavBlock from "./components/NavigationBlock";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import ExGroup from "./components/ExOpt";
import SearchResultList from "./components/SearchResultList/SearchResultList";
import APIWrapper from "./APIWrapper.js";
// API


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

const exampleOptions = ['One 1', 'Two 2', 'Three 3'];


const APIKey = process.env.REACT_APP_211_API_KEY
const API = new APIWrapper(APIKey)

class App extends React.Component {

  state = {
    sessionID: null,
    categories: []
  }

  async componentDidMount() {
    await API.initialize()

    this.setState({categories: await API.getCategories()})

    console.log(await API.serviceNameSearch({
      st: API.serviceType.serviceName,
      zip: '99504',
      catid: '',
      sn: 'Domestic Violence Shelters',
      county: ''
    }))

    console.log(await API.getKeywords({
      sn: 'Domestic'
    }))

//    console.log(await API.)
  }


  render() {
    return (
      <div className="App">
        <NavBar {...navbar} />
        <NavBlock />
        <FieldSelector />
        <SearchResultList categories={this.state.categories} />
        <ExGroup items={exampleOptions} />
        {/*<Footer />*/}
      </div>
    );
  }
}

export default App;
