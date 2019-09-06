import React from 'react';
import './SearchSidebar.css';

class SearchSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zipCode: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    this.setState({zipCode: event.target.value});
  }


  render() {
    return (
      <div id="search-sidebar">
        {/* Form Fields */}
        Zip code:
        <input type="text" value={this.state.zipCode} onChange={this.handleChange} />


        {/* Display */}
        <h1>
          {this.state.zipCode}
        </h1>
      </div>
    );
  }
}


export default SearchSidebar;
