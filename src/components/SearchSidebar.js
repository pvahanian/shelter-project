import React from 'react';
import './SearchSidebar.css';

class SearchSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sex: 'Male',
      zipCode: ''
    }

    this.handleSexChange = this.handleSexChange.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
  }

  handleZipChange(event) {
    this.setState({zipCode: event.target.value});
  }
  handleSexChange(event) {
    this.setState({sex: event.target.value});
  }

  render() {
    return (
      <div id="search-sidebar">
        <div id="search-sidebar-title">
          Search Bar
        </div>

        {/* Form Fields */}
        <div class="search-sidebar-field">
          Zip
          <input type="text" value={this.state.zipCode} onChange={this.handleZipChange} />
        </div>

        <div class="search-sidebar-field">
          Sex
          <select selected={this.state.sex} onChange={this.handleSexChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Display */}
        <h1>
          {this.state.zipCode}
        </h1>
      </div>
    );
  }
}


export default SearchSidebar;
