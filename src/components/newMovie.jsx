import React from 'react';
import Form from '../common/form';
import { getGenres } from '../services/fakeGenreService';
import { saveMovie, getMovie } from '../services/fakeMovieService';
import Joi from 'joi-browser';
import MovieModel from '../models/MovieModel';

class NewMovie extends Form {
  state = {
    data: new MovieModel(),
    errors: {},
    genres: []
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });
    const { id } = this.props.match.params;
    if (id === 'new') return;
    const movie = getMovie(id);
    if (!movie) return this.props.history.replace('/not-found');
    this.setState({ data: new MovieModel(movie) });
  }

  scheme = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label('Title'),
    genreId: Joi.required().label('Genre'),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label('Number in stock'),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label('Rate')
  };

  doSubmit = () => {
    const { push } = this.props.history;
    saveMovie(this.state.data);
    push('/movies');
  };

  render() {
    const { genres } = this.state;
    const { id } = this.props.match.params;
    return (
      <div>
        <h1>{id ? 'Edit' : 'New'} Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('Title', 'title')}
          {this.renderSelect('Genre', 'genreId', genres)}
          {this.renderInput('Number in stock', 'numberInStock', 'number')}
          {this.renderInput('Rate', 'dailyRentalRate')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default NewMovie;
