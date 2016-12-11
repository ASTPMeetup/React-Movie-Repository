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
      <div className="database">
        {this.props.movies.map(movie => {
          return (
            <Movie
              id={movie.id}
              key={movie.key}
              title={movie.title}
              genre={movie.genre}
              year={movie.year}
              rating={movie.rating}
              actors={movie.actors}
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
