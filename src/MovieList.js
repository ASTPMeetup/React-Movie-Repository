import React, { Component, PropTypes } from 'react';
import Movie from './Movie';
// import EditMovieForm from './EditMovieForm';

class MovieList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      updateMovieApp : this.props.updateApp
    }
  }

  updateMovieList(obj){
    this.state.updateMovieApp(obj);
    console.log('passed through movelist: ');
    console.log(obj);
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
                />
          );
        })}
      </div>
    );
  }
}

MovieList.PropTypes = {
  updateApp: React.PropTypes.func.isRequired
};

export default MovieList;
