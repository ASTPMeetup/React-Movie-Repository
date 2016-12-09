import React, {Component} from 'react';
import ToggleDisplay from 'react-toggle-display';

class Movie extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movieKey: this.props.id,
      movieTitle: this.props.title,
      movieGenre: this.props.genre,
      movieYear: this.props.year,
      movieActors: this.props.actors,
      movieRating: this.props.rating,
      edit_movie: false,
    };
  }

   handleDeleteClick(e) {
     const movieKey = e.target.parentNode.parentNode;
     console.log(movieKey);
     localStorage.removeItem(movieKey.getAttribute('id'));
     movieKey.parentNode.removeChild(movieKey);
   }

   handleEditFunc(e) {
     this.setState({
       edit_movie: true
     });
   }

   handleUpdateMovie(e){

     this.setState({
       edit_movie: false
     });
     localStorage.getItem(this.state.movieKey);
     localStorage.setItem(this.state.movieKey, JSON.stringify(this.state));

     e.preventDefault();
   }

   handleMovieTitleChange(e) {
      this.setState({movieTitle: e.target.value});
   }
   handleMovieGenreChange(e) {
      this.setState({movieGenre: e.target.value});
   }
   handleMovieYearChange(e) {
      this.setState({movieYear: e.target.value});
   }
   handleMovieRatingChange(e) {
      this.setState({movieRating: e.target.value});
   }
   handleMovieActorsChange(e) {
      this.setState({movieActors: e.target.value});
   }

   render(){
      return (
        <div className="row" id={this.state.movieKey}>
          <ol className="col-lg-12 movie_div">
            <img src="del.jpg" className="delete_img" onClick={this.handleDeleteClick.bind(this)} />

            <ToggleDisplay hide={this.state.edit_movie}>
              <span className="item">&#187;  {this.state.movieTitle}</span>
              <span className="item">&#187;  {this.state.movieGenre}</span>
              <span className="item">&#187;  {this.state.movieYear}</span>
              <span className="item">&#187;  {this.state.movieRating + '%'}</span>
              <span className="item">&#187;  {this.state.movieActors}</span>
            </ToggleDisplay>

            <ToggleDisplay show={this.state.edit_movie}>
              <form name="car_edit" className="car_edit" onSubmit={this.handleUpdateMovie.bind(this)}>
                <input name="movie title" type="text" id="make_edit" value={this.state.movieTitle} onChange={this.handleMovieTitleChange.bind(this)} required />
                <input name="movie genre" type="text" id="make_edit" value={this.state.movieGenre} onChange={this.handleMovieGenreChange.bind(this)} required />
                <input name="movie year" type="text" id="movieYear_edit" maxLength="4" value={this.state.movieYear} onChange={this.handleMovieYearChange.bind(this)} required />
                <input name="movie rating" type="text" id="movieYear_edit" maxLength="2" value={this.state.movieRating} onChange={this.handleMovieRatingChange.bind(this)} required />
                <input name="movie actors" type="text" id="make_edit" value={this.state.movieActors} onChange={this.handleMovieActorsChange.bind(this)} required />
                <input type="submit" value="update" className="button" id="update_submit" />
              </form>
            </ToggleDisplay>

            <a href="#" onClick={this.handleEditFunc.bind(this)} className="editLink">update</a>
            <hr />
          </ol>
        </div>
      );
   }
}

export default Movie;
