import React, { Component } from 'react';
import preventDefault from 'react-prevent-default';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import Movie from './Movie';
import axios from 'axios';
const RESTfulAPI = "https://openws.herokuapp.com/movies";
const apiKey = "?apiKey=8fa0e46f0361117d65d91d6032391324";

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
      inputRating: '',
      movieCount: 10
    };
  }

  componentDidMount() {

    // Check local storage to see if we have anything previously saved.
  const savedMovieList = [];
  axios.get(RESTfulAPI + apiKey)
    .then((response)=> {
      // If we found any movies we want to update our state
      var savedMovieList = response;
      if (savedMovieList) {
        this.setState({movieList:savedMovieList.data});
        console.log(this.state.movieList);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  //fires when a movie Component updates it's content.
  updateListView(editedMovie){
    const movies = this.state.movieList;
    const movieListIds = movies.map(movie => movie._id);
    const movieIndex = movieListIds.indexOf(editedMovie['_id']);

    axios.put(RESTfulAPI + '/' + editedMovie['_id'] + apiKey, editedMovie)
      .then((response)=> {
        //perform update so list matches latest updates
        console.log(response);
        movies[movieIndex] = editedMovie;
        this.setState({ ...this.state, movieList: movies});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteMovieListing(movieToDelete){
    // filters only the movies we don't want to delete and adds them to state
    const movieListings = this.state.movieList.filter(movie => movie._id !== movieToDelete['_id']);
    axios.delete(RESTfulAPI + '/' + movieToDelete['_id'] + apiKey)
      .then((response) => {
        console.log(response);
        this.setState({ ...this.state, movieList: movieListings });
      })
      .catch(function (error) {
        console.log(error);
      });
    this.emptyDatabaseView(movieListings.length);
  }

  handleAddMovie() {
    // combine the current userInput with the current userInputList
    var userInput = {"key": this.state.movieCount + 1, "Title": this.state.inputTitle,
                     "Genre": this.state.inputGenre, "Year": this.state.inputYear, "Metascore": this.state.inputRating,
                     "Actors": this.state.inputActors, "edit_movie": false};

   const movielist = [userInput, ...this.state.movieList];
   // set our userInputList in local storage using JSON.stringify
   axios.post(RESTfulAPI + apiKey ,userInput)
     .then((response) => {
       console.log(response);
         //Set and reset our App state
       this.setState({movieList: movielist, userInput: '', inputTitle: '', inputGenre: '',
                      inputYear: '', inputActors: '', inputRating: '', movieCount: this.state.movieCount++});
     })
     .catch(function (error) {
       console.log(error);
     });

   this.emptyDatabaseView(1);
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
      return movie.Title.toLowerCase().search(term) >= 0;
    });
  }

  handleChange(event) {
    this.setState({
      movieList: this.state.movieList,
      searchText: event.target.value
    });
  }

  emptyDatabaseView(checkForMovies){
    const displayValue = (checkForMovies > 0) ? "none" : "block";
    document.getElementById("emptyDatabaseView").style.display = displayValue;
  }

  render() {
    return (
      <div>
        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
          <form onSubmit={preventDefault(this.handleAddMovie.bind(this))} name="movie_input" className="movie_input" ref="form">
              <p>Title:</p>
                <input ref="input" onChange={this.handleInputChange.bind(this, 'inputTitle')} value={this.state.inputTitle} name="Tile" type="text" className="title_input" required />
              <p>Genre:</p>
                <input  ref="input" onChange={this.handleInputChange.bind(this, 'inputGenre')} value={this.state.inputGenre} name="Genre" type="text" className="genre_input" required />
              <p>Year:</p>
                <input  ref="input" onChange={this.handleInputChange.bind(this, 'inputYear')} value={this.state.inputYear} name="Year" type="number" max="2017" className="year_input" required />
              <p>Actors:</p>
                <input  ref="input" onChange={this.handleInputChange.bind(this, 'inputActors')} value={this.state.inputActors} name="Actors" type="text" className="actors_input" required />
              <p>Metascore:</p>
                <input  ref="input" onChange={this.handleInputChange.bind(this, 'inputRating')} value={this.state.inputRating} name="Metascore" type="number" className="rating_input" max="100" required />
                <input type="submit" value="Add Movie" className="button"/>
            </form>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9">
              <div className="thumbnail">
                  <img src="movie_banner.jpg" role="presentation" className="img-responsive" alt="movie banner" id="banner_image" />
                  <div className="caption-full">
                      <h2>React Movie Database</h2>
                      <blockquote>
                      <p>Submit movie info below to edit, remove and search through all your favorite films in our nifty OpenWS database!</p>
                      </blockquote>
                      <span>Search Titles: </span><SearchBar value={this.state.searchText} onChange={this.handleChange.bind(this)} />
                  </div>
              </div>
            <div className="database">
              <MovieList
                movies={this.getFilteredmovieList()}
                updateListing={this.updateListView.bind(this)}
                deleteListing={this.deleteMovieListing.bind(this)}
               />
               <span id="emptyDatabaseView"><p>Fill me up with movies!</p></span>
            </div>
          </div>
        </div>
      );
  }
}

export default App;
