import React from 'react';
import './SearchResult.css';

class SearchResult extends React.Component {
  render() {
    return (
      <div className="search-result">
        {this.props.heading}
      </div>
    );
  }
}

export default SearchResult;
