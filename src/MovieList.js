import React, { Component } from 'react';
import Movie from './Movie';
// import EditMovieForm from './EditMovieForm';

class MovieList extends Component {

  // handletitleChange(e) {
  //    this.setState({title: e.target.value});
  // }
  // handlegenreChange(e) {
  //    this.setState({genre: e.target.value});
  // }
  // handleyearChange(e) {
  //    this.setState({year: e.target.value});
  // }
  // handleratingChange(e) {
  //    this.setState({rating: e.target.value});
  // }
  // handleactorsChange(e) {
  //    this.setState({actors: e.target.value});
  // }

  updateMovieList(){
    this.forceUpdate();
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
                  updateMovieList={movie.updateMovieList}
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

export default MovieList;
