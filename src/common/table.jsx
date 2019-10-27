import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = ({ columns, onSort, columnSort, items }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} columnSort={columnSort} />
      <TableBody columns={columns} items={items} />
    </table>
  );
};

export default Table;
