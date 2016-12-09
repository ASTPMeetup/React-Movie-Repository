import React, {Component} from 'react';
import ToggleDisplay from 'react-toggle-display';

class TESTINGMovie extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      title: this.props.title,
      genre: this.props.genre,
      year: this.props.year,
      actors: this.props.actors,
      rating: this.props.rating,
      edit_movie: false
    };
  }

   handleDeleteClick(e) {
     const key = e.target.parentNode.parentNode;
     console.log(key);
     localStorage.removeItem(key.getAttribute('id'));
     key.parentNode.removeChild(key);
   }

   handleEditFunc(e) {
     this.setState({
       edit_movie: true
     });
   }

   handleUpdateMovie(e){
     const updateMovie = {"id": this.state.id, "title": this.state.title, "genre": this.state.genre,
                        "year": this.state.year, "rating": this.state.rating, "actors": this.state.actors};
     this.setState({
       edit_movie: false
     });
     localStorage.getItem(updateMovie.id);
     localStorage.setItem(updateMovie.id, JSON.stringify(updateMovie));

     e.preventDefault();
   }

   handletitleChange(e) {
      this.setState({title: e.target.value});
   }
   handlegenreChange(e) {
      this.setState({genre: e.target.value});
   }
   handleyearChange(e) {
      this.setState({year: e.target.value});
   }
   handleratingChange(e) {
      this.setState({rating: e.target.value});
   }
   handleactorsChange(e) {
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
                <input name="movie title" type="text" id="make_edit" value={this.state.title} onChange={this.handletitleChange.bind(this)} required />
                <input name="movie genre" type="text" id="make_edit" value={this.state.genre} onChange={this.handlegenreChange.bind(this)} required />
                <input name="movie year" type="text" id="year_edit"  value={this.state.year} onChange={this.handleyearChange.bind(this)} required  maxLength="4"/>
                <input name="movie rating" type="text" id="year_edit" value={this.state.rating} onChange={this.handleratingChange.bind(this)} maxLength="2" required />
                <input name="movie actors" type="text" id="make_edit" value={this.state.actors} onChange={this.handleactorsChange.bind(this)} required />
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

export default TESTINGMovie;
