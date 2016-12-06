import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import MovieList from './MovieList';


class MovieApp extends Component {

  constructor() {
    super();

    this.state = {
      userInput: '',
      movieList: []
      // title: '',
      // genre: '',
      // year: '',
      // ratings: '',
      // actors: ''
    };
  }

  componentDidMount() {
    // Check local storage to see if we have previously saved the userInputList
    const savedMovieList = JSON.parse(localStorage.getItem('movieList'));

    // If we found any movies we want to update our state
    if (savedMovieList) {
      this.setState({
        ...this.state,
        movieList: savedMovieList
      });
    }
  }

  handleAddItem(e) {
    // combine the current userInput with the current userInputList
    const userInput = {"title": this.state.title, "genre": this.state.genre, "year": this.state.year,
                       "rating": this.state.rating, "actors": this.state.actors};
    const movieList = [userInput, ...this.state.movieList];

    // Set our state
    this.setState({
      userInput: '',
      movieList: movieList
    });

    // set our userInputList in local storage using JSON.stringify
    localStorage.setItem('movieList', JSON.stringify(movieList));
    e.preventDefault();
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

  render() {
    return (
      <div>
        <div className="col-md-4">
          <form onSubmit={this.handleAddItem.bind(this)}>
              <p>Title:</p>
                <input onChange={this.handleTitleChange.bind(this)} name="year" type="text" className="title_input" required />
              <br />
              <p>Genre:</p>
                <input onChange={this.handleGenreChange.bind(this)} name="color" type="text" className="genre_input" required />
              <br />
              <p>Year:</p>
                <input onChange={this.handleYearChange.bind(this)} name="make" type="text" className="year_input" required />
              <br />
              <p>Rating:</p>
                <input onChange={this.handleRatingChange.bind(this)} name="mileage" type="text" className="rating_input" maxLength="5" required />
              <br />
              <p>Actors:</p>
                <input onChange={this.handleActorsChange.bind(this)} name="make" type="text" className="actors_input" required />
              <br />
                <input type="submit" value="Add Movie" />
            </form>
          </div>
          <div className="col-md-8">
              <div className="thumbnail">
                  <img src="movie_banner.jpg" className="img-responsive" alt="movie banner" />
                  <div className="caption-full">
                      <h3>React Movie Database</h3>
                      <p>This RESTful tool allows you to create, update, remove and list any movie in our database.</p>
                  </div>
              </div>
              <div className="well">
                <div className="database"><MovieList movies={this.state.movieList} /></div>
                  <p id="car_count"></p>
              </div>
          </div>
        </div>
      );
  }
}

export default MovieApp;
