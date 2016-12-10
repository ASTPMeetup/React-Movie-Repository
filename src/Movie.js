import React, {Component, PropTypes } from 'react';
import ToggleDisplay from 'react-toggle-display';

class Movie extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      key: this.props.id,
      title: this.props.title,
      genre: this.props.genre,
      year: this.props.year,
      actors: this.props.actors,
      rating: this.props.rating,
      edit_movie: false
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
     e.preventDefault();
     this.setState({
       edit_movie: false
     });
     this.storeUpdate(e);
     this.updateMovie();
   }

   storeUpdate(e){
     e.preventDefault();
     localStorage.getItem(this.state.id);
     localStorage.setItem(this.state.id, JSON.stringify(this.state));
   }
   updateMovie(props){
     this.props.updateMovieList(this.state);
   }

   handleTitleChange(e) {
      this.setState({title: e.target.value});
   }
   handleGenreChange(e) {
      this.setState({genre: e.target.value});
   }
   handleYearChange(e) {
      this.setState({year: e.target.value});
   }
   handleRatingChange(e) {
      this.setState({rating: e.target.value});
   }
   handleActorsChange(e) {
      this.setState({actors: e.target.value});
   }

   render(){
      return (
        <div className="row" id={this.state.id}>
          <ol className="col-lg-12 movie_div">
            <img src="del.jpg" className="delete_img" onClick={this.handleDeleteClick.bind(this)} />

            <ToggleDisplay hide={this.state.edit_movie}>
              <span className="item">&#187;  {this.state.title}</span>
              <span className="item">&#187;  {this.state.genre}</span>
              <span className="item">&#187;  {this.state.year}</span>
              <span className="item">&#187;  {this.state.rating + '%'}</span>
              <span className="item">&#187;  {this.state.actors}</span>
            </ToggleDisplay>

            <ToggleDisplay show={this.state.edit_movie}>
              <form name="car_edit" className="car_edit" onSubmit={this.handleUpdateMovie.bind(this)}>
                <input name="movie title" type="text" id="make_edit" value={this.state.title} onChange={this.handleTitleChange.bind(this)} required />
                <input name="movie genre" type="text" id="make_edit" value={this.state.genre} onChange={this.handleGenreChange.bind(this)} required />
                <input name="movie year" type="text" id="year_edit" value={this.state.year} onChange={this.handleYearChange.bind(this)} maxLength="4" required />
                <input name="movie rating" type="text" id="year_edit" value={this.state.rating} onChange={this.handleRatingChange.bind(this)} maxLength="2" required />
                <input name="movie actors" type="text" id="make_edit" value={this.state.actors} onChange={this.handleActorsChange.bind(this)} required />
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

Movie.PropTypes = {
  updateMovieList: React.PropTypes.func.isRequired
};

export default Movie;
