import React, { useState } from 'react';

const Filters = ({ filters, onFilterChange, onSearch, pageSize, setPageSize }) => {
  const [searchInput, setSearchInput] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setPageSize(newSize);
  };

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div style={styles.filterContainer}>
      <div style={styles.filterItem}>
        <label>Page Size: </label>
        <select value={pageSize} onChange={handlePageSizeChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>


      <div style={styles.filterItem}>
        <span onClick={handleSearchClick} style={styles.searchIcon}>🔍</span>
        {showSearch && (
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search..."
            style={styles.searchInput}
          />
        )}
      </div>

      {Object.keys(filters).map((filterKey) => (
        <div key={filterKey} style={styles.filterItem}>
          <label>{filters[filterKey].label}: </label>
          <input
            type="text"
            value={filters[filterKey].value}
            onChange={(e) => onFilterChange(filterKey, e.target.value)}
            placeholder={`Filter by ${filters[filterKey].label}`}
          />
        </div>
      ))}
    </div>
  );
};

const styles = {
  filterContainer: {
    display: 'flex',
    gap: '10px',
    padding: '10px',
    backgroundColor: '#c0e3e5',
    borderRadius: '5px',
  },
  filterItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  searchIcon: {
    cursor: 'pointer',
    fontSize: '20px',
  },
  searchInput: {
    padding: '5px',
    border: '1px solid #322625',
    borderRadius: '5px',
  },
};

export default Filters;
