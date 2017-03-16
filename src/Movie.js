 import React, {Component, PropTypes } from 'react';
import preventDefault from 'react-prevent-default';
import ToggleDisplay from 'react-toggle-display';

class Movie extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movie_id: this.props.movie_id,
      Title: this.props.Title,
      Genre: this.props.Genre,
      Year: this.props.Year,
      Actors: this.props.Actors,
      Metascore: this.props.Metascore,
      Plot: this.props.Plot,
      Poster: this.props.Poster,
      edit_movie: false
    };
  }

   handleDisplayEditForm(e) {
     this.setState({edit_movie: true});
   }

   handleUpdateMovie(props){
    this.setState({edit_movie: false});
    this.props.updateMovieList(this.state, this.state.movie_id);
   }

   handleDeleteClick(props) {
     this.props.deleteMovie(this.state.movie_id);
   }

   handleEditChange(stateName, e) {
      this.setState({[stateName]: e.target.value});
   }

   render(){
      return (
        <div className="row" id={this.state.movie_id}>

            <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12 poster">
              <ToggleDisplay show={this.state.Poster === ''}>
                <img role="presentation" src="movie-placeholder.png" width="140px"/>
              </ToggleDisplay>
              <ToggleDisplay show={this.state.Poster === "N/A"}>
                <img role="presentation" src="movie-placeholder-large.jpg" height="209px"/>
              </ToggleDisplay>
              <ToggleDisplay show={this.state.Poster !== "N/A" && this.state.Poster !== ''}>
                <img role="presentation" src={this.state.Poster} height="209px"/>
              </ToggleDisplay>
            </div>

            <div className="col-lg-10 col-md-10 col-sm-8 col-xs-12 details">
              <ToggleDisplay hide={this.state.edit_movie}>
                <h3 className="item"><strong>{this.state.Title}</strong></h3>
                <span className="item">{this.state.Year}</span>
                <img src="del.jpg" className="delete_img" role="presentation" onClick={preventDefault(this.handleDeleteClick.bind(this))} />
                <a href="#/" onClick={this.handleDisplayEditForm.bind(this)} className="editLink">update</a>
              </ToggleDisplay>

              <ToggleDisplay show={this.state.edit_movie}>
                <form name="car_edit" className="car_edit" onSubmit={preventDefault(this.handleUpdateMovie.bind(this))}>
                    <label>Title</label>
                    <input name="movie title" type="text" id="make_edit"
                    value={this.state.Title} onChange={this.handleEditChange.bind(this,'Title')}
                    required />

                    <label>Year</label>
                    <input name="movie year" type="number" id="year_edit" pattern="^\d{4}$"
                    value={this.state.Year} onChange={this.handleEditChange.bind(this,'Year')}
                    max="2017" />

                    <input type="submit" value="update" className="button" id="update_submit" />
                </form>
              </ToggleDisplay>

              <ToggleDisplay hide={this.state.Genre === ''}>
              <ol className="movie_div">
                <p className="item"><i>Genre: &nbsp;</i>{this.state.Genre}</p>
                <span className="item"><i>Metascore: &nbsp;</i>{this.state.Metascore}%&nbsp;<img src="meta.png" role="presentation" id="rm_icon" /></span>
                <p className="item"><i>Cast: &nbsp;</i>{this.state.Actors}</p>
                <p className="item"><i>Plot: &nbsp;</i>{this.state.Plot}</p>

              </ol>
              <hr />
              </ToggleDisplay>
              <ToggleDisplay show={this.state.Genre === ''}>
                <br />
                <br />
                <span id="no_data"><i>No IMDb data found</i></span>
                <hr />
              </ToggleDisplay>
          </div>
        </div>
      );
   }
}

Movie.PropTypes = {
  updateMovieList: React.PropTypes.func.isRequired,
  deleteMovie: React.PropTypes.func.isRequired
};

export default Movie;
