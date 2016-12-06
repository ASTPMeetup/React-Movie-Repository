import React, { Component } from 'react';
import Movie from './Movie';

class MovieList extends Component {
  render() {
    return (
      <ul className="movie-list">
        {this.props.movies.map(movie => {
          return (
            <Movie
              key={movie._id}
              title={movie.title}
              genre={movie.genre}
              actors={movie.actors}
              year={movie.year}
              rating={movie.rating}
            />
          )
        })}
      </ul>
    );
  }
}

export default MovieList;
