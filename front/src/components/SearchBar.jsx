import React, { useContext, useRef } from "react";
import context from "../context/scrapingContext";
import _ from "lodash";
export default function SearchBar({ setLocalData, localData }) {
  const { data } = useContext(context);
  const filterValues = useRef(null);
  const filterLocally = () => {
    const filterBy = filterValues.current.value;
    const filteredArr = data.filter(
      (entry) =>
        entry.title.toLowerCase().includes(filterBy.toLowerCase()) ||
        entry.content.toLowerCase().includes(filterBy.toLowerCase()) ||
        entry.author.toLowerCase().includes(filterBy.toLowerCase())
    );
    setLocalData(filteredArr.length ? filteredArr : []);
    errorMessage(filteredArr, filterBy);
  };

  const errorMessage = (data, filterVal) => {
    if (data.length === 0 && filterVal) {
      document.querySelector(".searchError").textContent = "Not Found";
    } else {
      document.querySelector(".searchError").textContent = "";
    }
  };
  const debouncedFilter = _.debounce(filterLocally, 300);
  return (
    <div className="searchBarDiv">
      <input
        ref={filterValues}
        onKeyDown={debouncedFilter}
        className="searchBar"
        placeholder="Search"
      ></input>
      <div className="searchError"></div>
    </div>
  );
}
