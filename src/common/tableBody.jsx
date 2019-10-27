import React from 'react';
import { get } from 'lodash-es';

const renderCell = (column, item) => {
  if (column.content) return column.content(item);
  return get(item, column.path);
};

const TableBody = ({ columns, items }) => {
  return (
    <tbody>
      {items.map(item => (
        <tr key={item._id}>
          {columns.map(column => (
            <td key={column.path || column.key}>{renderCell(column, item)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
