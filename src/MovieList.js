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
    console.log('object passed: ' + obj);
  }

  render() {
    return (
      <div className="database">
        {this.props.movies.map(movie => {
          return (
            // <div className="row" id={this.state.movieKey}>
            //   <ol className="col-lg-12 movie_div">
            //     <img src="del.jpg" className="delete_img" onClick={this.handleDeleteClick.bind(this)} />
            //
            //     <ToggleDisplay hide={this.state.edit_movie}>
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
                // </ToggleDisplay>
                //
                // <ToggleDisplay show={movie.edit_movie}>
                // <EditMovieForm
                //   id={movie.id}
                //   genre={movie.genre}
                //   year={movie.year}
                //   rating={movie.rating}
                //   actors={movie.actors}
                //   edit_movie={movie.edit_movie}
                //   handleUpdateMovie={this.handleUpdateMovie.bind(this)}
                //   handletitleChange={this.handletitleChange.bind(this)}
                //   handlgenreChange={this.handlegenreChange.bind(this)}
                //   handlegenreChange={this.handlegenreChange.bind(this)}
                //   handleratingChange={this.handleratingChange.bind(this)}
                //   handleactorsChange={this.handletitleChange.bind(this)}
                // />
                // </ToggleDisplay>
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
