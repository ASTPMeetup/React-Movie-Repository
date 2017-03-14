import React, {Component, PropTypes } from 'react';
import preventDefault from 'react-prevent-default';
import ToggleDisplay from 'react-toggle-display';

class Movie extends Component {

  constructor(props) {
    super(props);
    this.state = {
      _id: this.props._id,
      key: this.props._id,
      Title: this.props.Title,
      Genre: this.props.Genre,
      Year: this.props.Year,
      Actors: this.props.Actors,
      Metascore: this.props.Metascore,
      edit_movie: false
    };
  }

   handleDisplayEditForm(e) {
     this.setState({edit_movie: true});
   }

   handleUpdateMovie(props){
    this.setState({edit_movie: false});
    this.props.updateMovieList(this.state);
   }

   handleDeleteClick(props) {
     this.props.deleteMovie(this.state);
   }

   handleEditChange(stateName, e) {
      this.setState({[stateName]: e.target.value});
   }

   render(){
      return (
        <div className="row" id={this.state._id}>
          <ol className="col-lg-12 movie_div">
            <img src="del.jpg" className="delete_img" role="presentation" onClick={preventDefault(this.handleDeleteClick.bind(this))} />

            <ToggleDisplay hide={this.state.edit_movie}>
              <span className="item"><strong>{this.state.Title}</strong></span>
              <span className="item">{this.state.Year}</span>
              <span className="item">{this.state.Genre}</span>
              <span className="item"><img src="meta.png" role="presentation" id="rm_icon" />&nbsp;{this.state.Metascore + '%'}</span>
              <span className="item"><i>cast: &nbsp;</i>{this.state.Actors}</span>
              <a href="#" onClick={this.handleDisplayEditForm.bind(this)} className="editLink">update</a>
            </ToggleDisplay>

            <ToggleDisplay show={this.state.edit_movie}>

              <form name="car_edit" className="car_edit" onSubmit={preventDefault(this.handleUpdateMovie.bind(this))}>

                <input name="movie title" type="text" id="make_edit"
                value={this.state.Title} onChange={this.handleEditChange.bind(this,'Title')}
                required />

                <input name="movie genre" type="text" id="color_edit"
                value={this.state.Genre} onChange={this.handleEditChange.bind(this,'Genre')}
                required />

                <input name="movie year" type="number" id="year_edit"
                value={this.state.Year} onChange={this.handleEditChange.bind(this,'Year')}
                max="2017" required />

                <input name="movie rating" type="number" id="year_edit"
                value={this.state.Metascore} onChange={this.handleEditChange.bind(this,'Metascore')}
                max="100" required />

                <input name="movie actors" type="text" id="make_edit"
                value={this.state.Actors} onChange={this.handleEditChange.bind(this,'Actors')}
                required />

                <input type="submit" value="update" className="button" id="update_submit" />
              </form>
            </ToggleDisplay>
            <hr />
          </ol>
        </div>
      );
   }
}

Movie.PropTypes = {
  updateMovieList: React.PropTypes.func.isRequired,
  deleteMovie: React.PropTypes.func.isRequired
};

export default Movie;
