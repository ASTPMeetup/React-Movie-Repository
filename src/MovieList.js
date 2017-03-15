import React, { Component, PropTypes } from 'react';
import Movie from './Movie';
// import EditMovieForm from './EditMovieForm';

class MovieList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      updateListView : this.props.updateListing,
      deleteMovieView: this.props.deleteListing
    }
  }

  updateMovieList(editedMovie){
    this.state.updateListView(editedMovie);
  }

  deleteMovie(movieToDelete){
    this.state.deleteMovieView(movieToDelete);
  }

  render() {
    return (
      <div>
        {this.props.movies.map(movie => {
          return (
            <Movie
              _id={movie._id}
              key={movie._id}
              Title={movie.Title}
              Genre={movie.Genre}
              Year={movie.Year}
              Metascore={movie.Metascore}
              Actors={movie.Actors}
              Plot={movie.Plot}
              Poster={movie.Poster}
              updateMovieList={this.updateMovieList.bind(this)}
              deleteMovie={this.deleteMovie.bind(this)}
            />
          );
        })}
      </div>
    );
  }
}

MovieList.PropTypes = {
  updateListing: React.PropTypes.func.isRequired,
  deleteListing: React.PropTypes.func.isRequired
};

export default MovieList;
