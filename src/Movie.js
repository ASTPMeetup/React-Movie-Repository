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
        <div role="row" className="row" id={this.state.movie_id}>

            <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12 poster">
              <ToggleDisplay show={this.state.Poster === ''}>
                <img className="movieImg" role="presentation" src="movie-placeholder.png" alt="movie poster" width="140px"/>
              </ToggleDisplay>
              <ToggleDisplay show={this.state.Poster === "N/A"}>
                <img className="movieImg" role="presentation" src="movie-placeholder-large.jpg" alt="movie poster" />
              </ToggleDisplay>
              <ToggleDisplay show={this.state.Poster !== "N/A" && this.state.Poster !== ''}>
                <img className="movieImg" role="presentation" src={this.state.Poster} alt="movie poster" />
              </ToggleDisplay>
            </div>

            <div className="col-lg-10 col-md-10 col-sm-8 col-xs-12 details">
              <ToggleDisplay hide={this.state.edit_movie}>
                <h3 role="rowheader" className="item"><strong>{this.state.Title}</strong></h3>
                <h4 className="item">{this.state.Year}</h4>
                <span><img role="button" src="delete.png" className="delete_img" onClick={preventDefault(this.handleDeleteClick.bind(this))} alt="delete movie button"/></span>
                <span><img role="button" src="update.png" onClick={this.handleDisplayEditForm.bind(this)} className="editLink"  alt="update movie button"/></span>
              </ToggleDisplay>

              <ToggleDisplay show={this.state.edit_movie}>
                <form role="form" name="car_edit" className="car_edit" onSubmit={preventDefault(this.handleUpdateMovie.bind(this))}>
                    <label id="title_edit_input">Title</label>
                    <input aria-labelledby="title_edit_input" name="movie title" type="text" className="make_edit"
                    value={this.state.Title} onChange={this.handleEditChange.bind(this,'Title')}
                    required />

                    <label aria-labelledby="year_edit_input">Year</label>
                    <input aria-labelledby="year_edit_input" name="movie year" type="number" className="year_edit" pattern="^\d{4}$"
                    value={this.state.Year} onChange={this.handleEditChange.bind(this,'Year')}
                    max="2017" />

                    <input role="button" type="submit" value="update" className="button" className="update_submit" />
                </form>
              </ToggleDisplay>

              <ToggleDisplay hide={this.state.Genre === ''}>
                <ol className="movie_div" role="list">
                  <p role="listitem" className="item"><i>Genre: &nbsp;</i>{this.state.Genre}</p>
                  <span role="listitem" className="item"><i>Metascore: &nbsp;</i>{this.state.Metascore}%&nbsp;<img src="meta.png" role="presentation" alt="Metascore icon" className="rm_icon" /></span>
                  <p role="listitem" className="item"><i>Cast: &nbsp;</i>{this.state.Actors}</p>
                  <p role="listitem" className="item"><i>Plot: &nbsp;</i>{this.state.Plot}</p>
                </ol>
                <hr />
              </ToggleDisplay>
              <ToggleDisplay show={this.state.Genre === ''}>
                <br />
                <br />
                <span role="status" className="no_data"><i>No IMDb data found</i></span>
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
