import React, { Component } from 'react';
import preventDefault from 'react-prevent-default';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import Movie from './Movie';
import axios from 'axios';
const appDatabase = "https://openws.herokuapp.com/movies";
const appKey = "?apiKey=8fa0e46f0361117d65d91d6032391324";
const OMDbAPI = "https://www.omdbapi.com/?";

class OMDbMovie {
  constructor(Title, Year, Poster, Genre, Metascore, Actors, Plot) {
    this.Date = Date.now();
    this.key = Date.now();
    this.Title = Title;
    this.Year = Year;
    this.Genre = Genre;
    this.Metascore = Metascore;
    this.Actors = Actors;
    this.Poster = Poster;
    this.Plot = Plot;
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      searchText: '',
      userInput: '',
      movieList: [],
      inputTitle: '',
      inputYear: ''
    };
  }

  componentDidMount() {

    // Check local storage to see if we have anything previously saved.
  const savedMovieList = [];
  axios.get(appDatabase + appKey).then((response)=> {
      // If we found any movies we want to update our state
      var savedMovieList = response.data;
      savedMovieList.sort(function(a, b) { return parseFloat(b.Date) - parseFloat(a.Date); });
      if (savedMovieList) {
        this.setState({movieList:savedMovieList});
      }
    })
    .catch(function (error) { console.log(error); });
  }

  // combine the current userInput with the current userInputList
  handleAddMovie() {
    var OMDbTitle = this.state.inputTitle.trim().replace(/ /g, '+');
    var OMDbYear = this.state.inputYear;
    var OMDbRequest = OMDbAPI + 't=' + OMDbTitle + '&y=' + OMDbYear;

    axios.get(OMDbRequest).then((response) => {
        var rd = response.data;
        var OMDbObject = new OMDbMovie(rd.Title, rd.Year, rd.Poster, rd.Genre, rd.Metascore, rd.Actors, rd.Plot);

        if(!rd.Error) {
          axios.post(appDatabase + appKey, OMDbObject).then((response) => {
              const movielist = [OMDbObject, ...this.state.movieList];
              this.setState({movieList: movielist, userInput: '', inputTitle: '', inputYear: ''});
            })
            .catch(function (error) { console.log(error);});
        }
        else {
          var movieObject = new OMDbMovie(this.state.inputTitle, this.state.inputYear, '', '', '', '', '');
          axios.post(appDatabase + appKey, movieObject).then((response) => {
            console.log(response);
            const movielist = [movieObject, ...this.state.movieList];
            this.setState({movieList: movielist, userInput: '', inputTitle: '', inputYear: ''});
          })
          .catch(function (error) { console.log(error);});
        }
      })
      .catch(function (error) { console.log(error); });
  }

  //fires when a movie Component updates it's content.
  updateListView(editedMovie){
    const movies = this.state.movieList;
    const movieListIds = movies.map(movie => movie._id);
    const movieIndex = movieListIds.indexOf(editedMovie['_id']);

    var OMDb_t = editedMovie.Title.trim().replace(/ /g, '+');
    var OMDb_y = editedMovie.Year;
    var OMDbUpdateRequest = OMDbAPI + 't=' + OMDb_t + '&y=' + OMDb_y;

    axios.get(OMDbUpdateRequest).then((response) => {
        var rdata = response.data;
        var OMDbUpdatedObject = new OMDbMovie(rdata.Title, rdata.Year, rdata.Poster, rdata.Genre, rdata.Metascore, rdata.Actors, rdata.Plot);

        if(!rdata.Error) {
          axios.put(appDatabase + '/' + editedMovie['_id'] + appKey, OMDbUpdatedObject).then((response) => {
              OMDbUpdatedObject._id = editedMovie['_id'];
              movies[movieIndex] = OMDbUpdatedObject;
              this.setState({ ...this.state, movieList: movies});
          })
          .catch(function (error) { console.log(error);});
        }
        else {
          var updatedObject = new OMDbMovie(editedMovie.Title, editedMovie.Year, '', '', '', '', '');
          axios.put(appDatabase + '/' + editedMovie['_id'] + appKey, updatedObject).then((response) => {
            console.log(response);
            updatedObject._id = editedMovie['_id'];
            movies[movieIndex] = updatedObject;
            this.setState({ ...this.state, movieList: movies});
          })
          .catch(function (error) { console.log(error);});
        }
      })
      .catch(function (error) { console.log(error); });
  }

  deleteMovieListing(movieToDelete){
    // filters only the movies we don't want to delete and adds them to state
    const movieListings = this.state.movieList.filter(movie => movie._id !== movieToDelete['_id']);

    axios.delete(appDatabase + '/' + movieToDelete['_id'] + appKey).then((response) => {
        console.log(response);
        this.setState({ ...this.state, movieList: movieListings });
      })
      .catch(function (error) { console.log(error); });
  }

  handleInputChange(stateName, e) {
     this.setState({[stateName]: e.target.value});
  }

  getFilteredmovieList() {
    // Remove any white space, and convert the searchText to lowercase
    const term = this.state.searchText.trim().toLowerCase();
    const movieList = this.state.movieList;

    // If our term is an empty string, we want to return all of the movieList
    if (!term) { return movieList;  }

    // Filter will return a new array for movieList. If searchText has
    // an index value in a movie in movieList, it will return those movies.
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

  render() {
    return (
      <div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="thumbnail">
                  <img src="movie_banner2.jpg" role="presentation" className="img-responsive" alt="movie banner" id="banner_image" />
                  <div className="caption-full">
                      <h2>React Movie Database</h2>
                      <blockquote>
                      <p>This RESTful application ultilizes OMDb API to auto-generate data based on movie title submissions. Submit a title below to edit, remove and search through all your favorite films. </p>
                      </blockquote>
                      <div id="input_container">
                        <div>
                          <label>Search Titles: </label><SearchBar value={ this.state.searchText} onChange={this.handleChange.bind(this)} />
                        </div>
                        <div>
                          <form onSubmit={preventDefault(this.handleAddMovie.bind(this))} name="movie_input" className="movie_input form-inline" ref="form">
                            <div className="form-group">
                              <label>Title: </label>
                              <input ref="input" onChange={this.handleInputChange.bind(this, 'inputTitle')} value={this.state.inputTitle} name="Tile" type="text" className="title_input" required />
                            </div>
                            <div className="form-group">
                              <label>Year (optional): </label>
                              <input  ref="input" onChange={this.handleInputChange.bind(this, 'inputYear')} value={this.state.inputYear} name="Year" type="number" pattern="^\d{4}$" max="2017" className="year_input"/>
                            </div>
                            <input type="submit" value="Add Movie" className="button"/>
                          </form>
                        </div>
                      </div>
                  </div>
              </div>
            <div className="database">
              <br />
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
