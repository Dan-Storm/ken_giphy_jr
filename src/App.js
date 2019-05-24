import React, { Component } from 'react';
import './App.css';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      gifs: [],
      loadin: true
    };
  } 

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (search = 'cats') => {
    fetch(`http://api.giphy.com/v1/gifs/search?q=${search}&limit=32&api_key=9BKDmEVkYPcVArOLubfs9TklRw2oyav0`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({ 
        gifs: responseData.data,
        loading: false 
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render() { 
    console.log(this.state.gifs);
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch}/>      
          </div>   
        </div>    
        <div className="main-content">
        {
          (this.state.loading)
          ?<p>Loading...</p>
          : <GifList data={this.state.gifs}/>
        }
        </div>
      </div>
    );
  }
}
