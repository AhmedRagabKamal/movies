import { get } from 'lodash-es';
class MovieModel {
  constructor(data = {}) {
    this._id = get(data, '_id', '');
    this.title = get(data, 'title', '');
    this.genreId = get(data, 'genre._id', '');
    this.numberInStock = get(data, 'numberInStock', '');
    this.dailyRentalRate = get(data, 'dailyRentalRate', '');
  }
}

export default MovieModel;
