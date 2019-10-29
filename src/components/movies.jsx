import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from '../common/pagination';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/fakeGenreService';
import ListGroup from '../common/listGroup';
import MoviesTable from './moviesTable';
import { orderBy } from 'lodash-es';
import SearchBox from './searchBox';

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [{ _id: '', name: 'All' }, ...getGenres()],
    selectedGenre: '',
    columnSort: { path: 'title', order: 'asc' },
    search: ''
  };

  componentDidMount() {
    this.setState({ movies: getMovies() });
  }

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
    this.setState({ selectedGenre: genre, search: '', currentPage: 1 });
  };
  handleSort = columnSort => {
    this.setState({ columnSort });
  };
  handleSearch = search => {
    this.setState({ search, currentPage: 1, selectedGenre: '' });
  };

  render() {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      genres,
      columnSort,
      search
    } = this.state;
    const { history } = this.props;
    const { length: count } = allMovies;
    if (count === 0) return <p>There is no movie in database</p>;
    let filtered = allMovies;
    if (search) {
      filtered = allMovies.filter(movie =>
        movie.title.toLowerCase().startsWith(search.toLocaleLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter(
        movie => movie.genre._id === selectedGenre._id
      );
    }
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
          <button
            onClick={() => history.push('/new-movie')}
            className="btn btn-primary btn-sm"
          >
            New movie
          </button>
          <p>Show {filtered.length} movie in database</p>
          <SearchBox search={search} onSearch={this.handleSearch} />
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
