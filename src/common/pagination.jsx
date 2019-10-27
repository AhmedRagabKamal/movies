import React from 'react';
import { range } from 'lodash-es';
import PropTypes from 'prop-types';

const Pagination = ({ itemsCount, pageSize, onPageChanged, currentPage }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = range(1, pagesCount + 1);
  return (
    <ul className="pagination">
      {pages.map(page => (
        <li
          key={page}
          className={currentPage === page ? 'page-item active' : 'page-item'}
        >
          <a
            onClick={() => onPageChanged(page)}
            className="page-link"
            href="#asdsd"
          >
            {page}
          </a>
        </li>
      ))}
    </ul>
  );
};

Pagination.prototype = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default Pagination;
