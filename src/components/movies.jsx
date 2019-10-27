import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from '../common/pagination';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/fakeGenreService';
import ListGroup from '../common/listGroup';
import MoviesTable from './moviesTable';
import { orderBy } from 'lodash-es';

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
    genres: [{ _id: '', name: 'All' }, ...getGenres()],
    selectedGenre: '',
    columnSort: { path: 'title', order: 'asc' }
  };

  handleDelete = ({ _id }) => {
    const movies = this.state.movies.filter(movie => movie._id !== _id);
    this.setState({ movies });
  };
  handleLiked = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChanged = page => {
    this.setState({ currentPage: page });
  };

  handleSelectGenre = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleSort = columnSort => {
    this.setState({ columnSort });
  };

  render() {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      genres,
      columnSort
    } = this.state;
    const { length: count } = allMovies;
    if (count === 0) return <p>There is no movie in database</p>;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
        : allMovies;
    const sorted = orderBy(filtered, [columnSort.path], [columnSort.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            genres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={this.handleSelectGenre}
          />
        </div>
        <div className="col">
          <p>Show {filtered.length} movie in database</p>
          <MoviesTable
            movies={movies}
            onLiked={this.handleLiked}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            columnSort={columnSort}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            onPageChanged={this.handlePageChanged}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
