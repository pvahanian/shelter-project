import React from 'react';
import './SearchSidebar.css';

class SearchSidebar extends React.Component {
  render() {
    return (
      <h1>
        Hello, {this.props.name} That was my name
      </h1>
    );
  }
}
export default SearchSidebar;
