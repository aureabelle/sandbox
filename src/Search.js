import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      isSearching: false
    };
  }

  componentDidMount() {
    fetch('http://api.giphy.com/v1/gifs/search?q=hello&api_key=qIdRU45kDuxbEvTyZZahSM8gENdH9e19&limit=100')
      .then(res => res.json())
      .then(result => {
          this.setState({
            items: result.data,
            isSearching: true
          });
        }, (error) => {
          this.setState({
            error
          });
        })
  }

  render() {
    const { items } = this.state;

    return (
      <div className="container">
        <h1>Animated Gifs</h1>
        <div className="items">
          {items.map((item, index) => {
            return (
              <div className="item" key={`item-${index}`}>
                <img src={item.images.downsized.url} height={item.images.downsized.height} width={item.images.downsized.width} alt={item.title} />
                <span>{item.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Search;
