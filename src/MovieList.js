import React, { Component } from 'react';
import Movie from './Movie';

class MovieList extends Component {
  render() {
    return (
      <div className="database">
        {this.props.movies.map(movie => {
          return (
            <Movie
              title={movie.title}
              genre={movie.genre}
              year={movie.year}
              rating={movie.rating}
              actors={movie.actors}
            />
          )
        })}
      </div>
    );
  }
}

export default MovieList;
