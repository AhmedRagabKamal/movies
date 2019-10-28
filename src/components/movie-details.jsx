import React from 'react';

const handleSave = ({ push }) => {
  push('/movies');
};

const MovieDetails = ({ match, history }) => {
  return (
    <>
      <h1>Movies Id : {match.params.id}</h1>
      <button
        className="btn btn-primary btn-sm"
        onClick={() => handleSave(history)}
      >
        Save
      </button>
    </>
  );
};

export default MovieDetails;
