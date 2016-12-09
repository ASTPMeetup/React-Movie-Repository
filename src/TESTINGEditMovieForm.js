import React, {Component} from 'react';

class TESTINGEditMovieForm extends Component {


  render(){
    return (
      <form name="car_edit" className="car_edit" onSubmit={this.props.handleUpdateMovie.bind(this)}>
        <input name="movie title" type="text" id="make_edit" value={this.props.title} onChange={this.props.handletitleChange.bind(this)} required />
        <input name="movie genre" type="text" id="make_edit" value={this.props.genre} onChange={this.props.handlegenreChange.bind(this)} required />
        <input name="movie year" type="text" id="year_edit" maxLength="4" value={this.props.year} onChange={this.props.handleyearChange.bind(this)} required />
        <input name="movie rating" type="text" id="year_edit" maxLength="2" value={this.props.rating} onChange={this.props.handleratingChange.bind(this)} required />
        <input name="movie actors" type="text" id="make_edit" value={this.props.actors} onChange={this.props.handleactorsChange.bind(this)} required />
        <input type="submit" value="update" className="button" id="update_submit" />
      </form>
    );
  }
}

TESTINGEditMovieForm.propTypes = {
  handletitleChange: React.PropTypes.func,
  handlegenreChange: React.PropTypes.func,
  handleyearChange: React.PropTypes.func,
  handleratingChange: React.PropTypes.func,
  handleactorsChange: React.PropTypes.func,
  handleUpdateMovie: React.PropTypes.func
}

export default TESTINGEditMovieForm;
