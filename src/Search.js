import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      term: 'eminem',
      items: [],
      isSearching: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const { term } = this.state;

    fetch(`https://itunes.apple.com/search?term=${term}`)
      .then(res => res.json())
      .then(result => {
          this.setState({
            items: result.results,
            isSearching: true
          });
        }, (error) => {
          this.setState({
            error
          });
        })
  }

  componentWillUpdate() {
    const { term } = this.state;

    fetch(`https://itunes.apple.com/search?term=${term}`)
      .then(res => res.json())
      .then(result => {
          this.setState({
            items: result.results,
            isSearching: true
          });
        }, (error) => {
          this.setState({
            error
          });
        })
  }

  handleInputChange(event) {
    const { term } = this.state;
    this.setState({
      term: event.target.value,
      isSearching: true
    });
  };

  render() {
    const {
      term,
      items,
      isSearching
    } = this.state;

    return (
      <div className="container">
        <div className="aside">
          <h2>Spotify</h2>
          <ul>
            <li><a>Search</a></li>
            <li><a>Home</a></li>
            <li><a>Library</a></li>
          </ul>
        </div>

        <div className="main">
          <input placeholder="Start typing..." value={term} onChange={this.handleInputChange} />
          {!isSearching ?
            <div>
              <h1>Search Spotify</h1>
              <p>Find your favorite songs, artists, albums, podcasts and playlists.</p>
            </div>
          :
            <div>
              <h1>Albums</h1>
              {items.map((item, index) => {
                return (
                  <div key={`item-${index}`} className="album">
                    <img src={item.artworkUrl100} />
                    <span className="album-title">{item.collectionName}</span>
                    <span className="artist">{item.artistName}</span>
                  </div>
                );
              })}
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Search;
