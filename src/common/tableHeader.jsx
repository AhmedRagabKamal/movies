import React from 'react';

function raiseSort(path, columnSort, onSort) {
  const sortColumn = { ...columnSort };
  if (sortColumn.path === path) {
    sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn.path = path;
    sortColumn.order = 'asc';
  }
  onSort(sortColumn);
}

const renderSortIcon = (column, columnSort) => {
  if (column.path !== columnSort.path) return null;
  if (columnSort.order === 'asc') return <i className="fa fa-sort-asc"></i>;
  return <i className="fa fa-sort-desc"></i>;
};

const TableHeader = ({ columns, columnSort, onSort }) => {
  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th
            key={column.path || column.key}
            onClick={() => raiseSort(column.path, columnSort, onSort)}
          >
            {column.label} {renderSortIcon(column, columnSort)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
