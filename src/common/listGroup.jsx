import React from 'react';

const ListGroup = ({
  genres,
  selectedGenre,
  onSelectGenre,
  textProperty,
  valueProperty
}) => {
  return (
    <ul className="list-group">
      {genres.map(genre => (
        <li
          onClick={() => onSelectGenre(genre)}
          key={genre[valueProperty]}
          className={
            selectedGenre.name === genre.name
              ? 'list-group-item active'
              : 'list-group-item'
          }
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
};

export default ListGroup;
