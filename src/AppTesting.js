import React, { Component } from 'react';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import axios from 'axios';

class AppTesting extends Component {
  constructor() {
    console.log('constructor');
    debugger;
    super();

    this.state = {
      searchText: '',
      movieList: [],
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

    // If we found any movieList we want to update our state
    if (savedUserInputList) {
      this.setState({
        ...this.state,
        this.state.movieList: savedUserInputList
      });
    }
  }


  handleChange(event) {
    this.setState({
      movieList: this.state.movieList,
      searchText: event.target.value
    });
  }

  handleAddItem() {
    const userInputList = [this.state.userInput, ...this.state.movieList];

    // Set our state
    this.setState({
      ...this.state,
      userInput: '',
      this.state.movieList: userInputList
    });

    localStorage.setItem('userInputList', JSON.stringify(userInputList));
  }

  getFilteredmovieList() {
    // Remove any white space, and convert the searchText to lowercase
    const term = this.state.searchText.trim().toLowerCase();
    const movieList = this.state.movieList;

    // If our term is an empty string, we want to return all of the movieList
    if (!term) {
      return movieList;
    }

    // Filter will return a new array of movieList, the movieList will
    // be included in the array if the function returns true,
    // and excluded if the function returns false
    return movieList.filter(movie => {
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
        <MovieList movieList={this.getFilteredmovieList()} />
      </div>
    );
  }
}

export default AppTesting;
