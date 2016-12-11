import React, { Component } from 'react';
import preventDefault from 'react-prevent-default';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import Movie from './Movie';

class App extends Component {

  constructor() {
    super();
    this.state = {
      searchText: '',
      userInput: '',
      movieList: [],
      inputTitle: '',
      inputGenre: '',
      inputYear: '',
      inputActors: '',
      inputRating: ''
    };
  }

  componentDidMount() {

    // Check local storage to see if we have anything previously saved.
    const savedMovieList = [];
    const keys = Object.keys(localStorage);
    var i = keys.length;
    while (i--) {
        savedMovieList.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    // If we found any movies we want to update our state
    if (savedMovieList) {
      this.setState({
        ...this.state,
        movieList: savedMovieList
      });
    }
  }

  updateListView(editedMovie){
    const movies = this.state.movieList;
    const movieListIds = movies.map(movie => movie.id);
    const movieIndex = movieListIds.indexOf(editedMovie['id']);

    //perform update
    movies[movieIndex] = editedMovie;
    this.setState({ ...this.state, movieList: movies });

    //update localStorage
    localStorage.getItem(editedMovie['id']);
    localStorage.setItem(editedMovie['id'], JSON.stringify(editedMovie));
  }

  deleteMovieListing(movieToDelete){
    const movieListings = this.state.movieList.filter(movie => movie.id !== movieToDelete['id']);
    this.setState({ ...this.state, movieList: movieListings });
    localStorage.removeItem(movieToDelete['id']);
  }

  handleAddMovie(e) {
    e.currentTarget.reset();
    // combine the current userInput with the current userInputList
    const userInput = {"id": this.state.inputTitle, "key": this.state.inputTitle, "title": this.state.inputTitle,
                       "genre": this.state.inputGenre, "year": this.state.inputYear, "rating": this.state.inputRating,
                       "actors": this.state.inputActors, "edit_movie": false};

   const movieList = [userInput, ...this.state.movieList];
   // set our userInputList in local storage using JSON.stringify
   localStorage.setItem(userInput.id, JSON.stringify(userInput));
    //Set and reset our App state
    this.setState({userInput: '', movieList: movieList});
  }

  handleInputChange(stateName, e) {
     this.setState({[stateName]: e.target.value});
  }

  getFilteredmovieList() {
    // Remove any white space, and convert the searchText to lowercase
    const term = this.state.searchText.trim().toLowerCase();
    const movieList = this.state.movieList;

    // If our term is an empty string, we want to return all of the movieList
    if (!term) {
      return movieList;
    }

    // Filter will return a new array of movieList, if searchText has
    // an index value in a movie in movieList it will return true.
    return movieList.filter(movie => {
      return movie.title.toLowerCase().search(term) >= 0;
    });
  }

  handleChange(event) {
    this.setState({
      movieList: this.state.movieList,
      searchText: event.target.value
    });
  }

  render() {
    return (
      <div>
        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
          <form onSubmit={preventDefault(this.handleAddMovie.bind(this))} name="movie_input" className="movie_input">
              <p>Title:</p>
                <input onChange={this.handleInputChange.bind(this, 'inputTitle')} value={this.state.inputTitle} name="tile" type="text" className="title_input" required />
              <p>Genre:</p>
                <input onChange={this.handleInputChange.bind(this, 'inputGenre')} value={this.state.inputGenre} name="genre" type="text" className="genre_input" required />
              <p>Year:</p>
                <input onChange={this.handleInputChange.bind(this, 'inputYear')} value={this.state.inputYear} name="year" type="text" className="year_input" required />
              <p>Actors:</p>
                <input onChange={this.handleInputChange.bind(this, 'inputActors')} value={this.state.inputActors} name="actors" type="text" className="actors_input" required />
              <p>Rotten Tomatoes Rating:</p>
                <input onChange={this.handleInputChange.bind(this, 'inputRating')} value={this.state.inputRating} name="rating" type="text" className="rating_input" maxLength="3" required />
                <input type="submit" value="Add Movie" className="button"/>
            </form>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9">
              <div className="thumbnail">
                  <img src="movie_banner.jpg" role="presentation" className="img-responsive" alt="movie banner" id="banner_image" />
                  <div className="caption-full">
                      <h2>React Movie Database</h2>
                      <span>Search: </span><SearchBar value={this.state.searchText} onChange={this.handleChange.bind(this)} />
                  </div>
              </div>
            <div className="database">
              <MovieList
                movies={this.getFilteredmovieList()}
                updateListing={this.updateListView.bind(this)}
                deleteListing={this.deleteMovieListing.bind(this)}
               />
            </div>
          </div>
        </div>
      );
  }
}

export default App;
