import SearchResult from "./SearchResult";

const [searchResult, setSearchResult] = null;

//obj is the api request return json, req is a string name of the API wrapper
export function storeResult(obj, req) {
    setSearchResult(obj);
}

export function fetchResult() {
    return searchResult;
}