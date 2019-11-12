import React from 'react';
import './SearchResultList.css';
import SearchResult from "../SearchResult/SearchResult";

class SearchResultList extends React.Component {

  render() {
    return (
      <div id="search-result-list">
        {
          this.props.categories.length === 0 ?
            <>
              Querying the API...
              <div id="loading"/>
            </>
          :
            <>
              Search Results:
              {
                this.props.categories.map((category, i) => {
                  return (
                    <SearchResult heading={category.category} key={i}/>
                  )
                })
              }
            </>
        }
      </div>
    );
  }
}

export default SearchResultList;
