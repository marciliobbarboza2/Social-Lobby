import React, { useState } from 'react';

const SearchFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all'); // all, title, content, author

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value, filterBy);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterBy(value);
    onSearch(searchTerm, value);
  };

  const handleClear = () => {
    setSearchTerm('');
    setFilterBy('all');
    onSearch('', 'all');
  };

  return (
    <div className="search-filter-container">
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
          aria-label="Search posts"
        />
        {searchTerm && (
          <button 
            onClick={handleClear} 
            className="clear-search-btn"
            aria-label="Clear search"
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <select 
        value={filterBy} 
        onChange={handleFilterChange}
        className="filter-select"
        aria-label="Filter by"
      >
        <option value="all">All Fields</option>
        <option value="title">Title Only</option>
        <option value="content">Content Only</option>
        <option value="author">Author Only</option>
      </select>
    </div>
  );
};

export default SearchFilter;
