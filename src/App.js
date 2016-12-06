import React, { Component } from 'react';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import axios from 'axios';

class App extends Component {
  constructor() {
    console.log('constructor');
    debugger;
    super();

    this.state = {
      searchText: '',
      movies: [],
      userInput: ''
    };
  }

  componentWillMount() {
    console.log('componentWillMount');
    debugger;
  }

  componentDidMount() {
    // Check local storage to see if we have previously saved the userInputList
    const savedUserInputList = JSON.parse(localStorage.getItem('userInputList'));

    // If we found any movies we want to update our state
    if (savedUserInputList) {
      this.setState({
        ...this.state,
        this.state.movies: savedUserInputList
      });
    }
  }


  handleChange(event) {
    this.setState({
      movies: this.state.movies,
      searchText: event.target.value
    });
  }

  handleAddItem() {
    const userInputList = [this.state.userInput, ...this.state.movies];

    // Set our state
    this.setState({
      ...this.state,
      userInput: '',
      this.state.movies: userInputList
    });

    localStorage.setItem('userInputList', JSON.stringify(userInputList));
  }

  getFilteredMovies() {
    // Remove any white space, and convert the searchText to lowercase
    const term = this.state.searchText.trim().toLowerCase();
    const movies = this.state.movies;

    // If our term is an empty string, we want to return all of the movies
    if (!term) {
      return movies;
    }

    // Filter will return a new array of movies, the movies will
    // be included in the array if the function returns true,
    // and excluded if the function returns false
    return movies.filter(movie => {
      return movie.title.toLowerCase().search(term) >= 0;
    });
  }

  render() {
    console.log('render');
    debugger;
    return (
      <div className="App">
        <MovieForm
        <SearchBar value={this.state.searchText} onChange={this.handleChange.bind(this)}/>
        <MovieList movies={this.getFilteredMovies()} />
      </div>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById('main'));

export default App;
