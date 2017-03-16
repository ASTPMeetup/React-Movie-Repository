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
      // If we found any movies, we want to update our movie list state by recent submissions
      var savedMovieList = response.data;
      savedMovieList.sort(function(a, b) { return parseFloat(b.Date) - parseFloat(a.Date); });
      if (savedMovieList) {
        this.setState({movieList:savedMovieList});
      }
    })
    .catch(function (error) { console.log(error); });
  }

  configOMBdRequest(title, year){
    var OMDbTitle = title.trim().replace(/ /g, '+');
    var OMDbGetRequest = OMDbAPI + 't=' + OMDbTitle + '&y=' + year;
    return OMDbGetRequest;
  }

  // combine the current userInput with the current movie list
  handleAddMovie() {
    //scrub input data to configure OMDb request
    var OMDbRequest = this.configOMBdRequest(this.state.inputTitle, this.state.inputYear);

    axios.get(OMDbRequest).then((response) => {
        console.log(response.status);
        var rd = response.data;
        var OMDbObject = new OMDbMovie(rd.Title, rd.Year, rd.Poster, rd.Genre, rd.Metascore, rd.Actors, rd.Plot);

        // if OMBd responses with no data found
        if(rd.Error) {
          var movieObject = new OMDbMovie(this.state.inputTitle, this.state.inputYear, '', '', '', '', '');
          this.handlePostRequest(movieObject);
        }
        else { this.handlePostRequest(OMDbObject); }
      })
      .catch(function (error) { console.log(error); });
  }

  handlePostRequest(obj) {
    axios.post(appDatabase + appKey, obj).then((response) => {
        obj._id = response.data._id;
        const movielist = [obj, ...this.state.movieList];
        this.setState({movieList: movielist, userInput: '', inputTitle: '', inputYear: ''});
      })
      .catch(function (error) { console.log(error);});
  }

  //fires when a movie Component updates it's content.
  updateListView(editedMovie, movie_id){
    //scrub input data to configure OMDb request
    var OMDbUpdateRequest = this.configOMBdRequest(editedMovie.Title, editedMovie.Year);

    axios.get(OMDbUpdateRequest).then((response) => {
        console.log(response.status);
        var rdata = response.data;
        var OMDbUpdatedObject = new OMDbMovie(rdata.Title, rdata.Year, rdata.Poster, rdata.Genre, rdata.Metascore, rdata.Actors, rdata.Plot);

        if(rdata.Error) {
          var updatedObject = new OMDbMovie(editedMovie.Title, editedMovie.Year, '', '', '', '', '');
          this.handlePutRequest(editedMovie, movie_id, updatedObject);
        }
        else { this.handlePutRequest(editedMovie, movie_id, OMDbUpdatedObject); }
      })
      .catch(function (error) { console.log(error); });
  }

  handlePutRequest(editObj, movie_id, updatedObj){
    //locate movie item to update in our list
    const movies = this.state.movieList;
    const movieListIds = movies.map(movie => movie._id);
    const movieIndex = movieListIds.indexOf(movie_id);

    axios.put(appDatabase + '/' + movie_id + appKey, updatedObj).then((response) => {
      console.log(response.status);
      updatedObj._id = movie_id;
      movies[movieIndex] = updatedObj;
      this.setState({ ...this.state, movieList: movies});
    })
    .catch(function (error) { console.log(error);});
  }

  deleteMovieListing(movie_id){
    // filters only the movies we don't want to delete and adds them to state
    const movieListings = this.state.movieList.filter(movie => movie._id !== movie_id);

    axios.delete(appDatabase + '/' + movie_id + appKey).then((response) => {
        console.log(response.status);
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
                      <p role="contentinfo">This RESTful application ultilizes OMDb API to auto-generate data based on movie title submissions. Submit a title below to edit, remove and search through all your favorite films. </p>
                      </blockquote>
                      <div id="input_container">
                        <div>
                          <label id="movie_search">Search Titles: </label><SearchBar value={ this.state.searchText} onFocus="window.scroll(0,0)" onChange={this.handleChange.bind(this)} />
                        </div>
                        <div>
                          <form role="form" onSubmit={preventDefault(this.handleAddMovie.bind(this))} name="movie_input" className="movie_input form-inline" ref="form">
                            <div className="form-group">
                              <label id="title_submit">Title: </label>
                              <input aria-labelledby="title_submit" ref="input" onChange={this.handleInputChange.bind(this, 'inputTitle')} value={this.state.inputTitle} name="Tile" type="text" className="title_input" required />
                            </div>
                            <div className="form-group">
                              <label id="year_search">Year (optional): </label>
                              <input aria-labelledby="year_submit" ref="input" onChange={this.handleInputChange.bind(this, 'inputYear')} value={this.state.inputYear} name="Year" type="number" pattern="^\d{4}$" max="2017" className="year_input"/>
                            </div>
                            <input type="submit" role="button" value="Add Movie" className="button"/>
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
