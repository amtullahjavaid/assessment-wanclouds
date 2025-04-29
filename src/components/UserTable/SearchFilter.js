import React from 'react';

const SearchFilter = ({ searchTerm, onSearchChange, filterField, onFilterChange }) => {
  return (
    <div className="search-filter-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="filter-box">
        <label htmlFor="filter-select">Filter by:</label>
        <select
          id="filter-select"
          value={filterField}
          onChange={(e) => onFilterChange(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Fields</option>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="company">Company</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;