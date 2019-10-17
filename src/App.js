import React from 'react';
import logo from './logo.svg';
import './App.css';
import FieldSelector from "./components/FieldSelector";
import NavBlock from "./components/NavigationBlock";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import ExGroup from "./components/ExOpt";
import SearchResultList from "./components/SearchResultList/SearchResultList";

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
console.log(process.env.REACT_APP_211_API_KEY)

class App extends React.Component {

  state = {
    sessionID: null,
    categories: []
  }

  async componentDidMount() {
    await this.timeConsuming()
    await this.getSessionID()
    this.getCategories()
  }

  timeConsuming = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        1000
      )
    );
  }

  async getSessionID() {
    await fetch(
      `https://www.navigateopen.info/pubres/api/GetSessionID/?ip={apikey: "${APIKey}"}`
    )
    .then(response => response.json())
    .then((data) => {
      this.setState({sessionID: data[0]['session_id']})
    })
  }

  async getCategories() {
    fetch(
      `https://www.navigateopen.info/pubres/api/GetCategories/?ip={sid: "${this.state.sessionID}", apikey: "${APIKey}"}`
    )
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      this.setState({categories: data})
    })
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
