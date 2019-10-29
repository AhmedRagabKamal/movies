import React from 'react';

const SearchBox = ({ search, onSearch }) => {
  return (
    <input
      value={search}
      onChange={e => onSearch(e.currentTarget.value)}
      type="search"
      className="form-control mb-2"
    />
  );
};

export default SearchBox;
