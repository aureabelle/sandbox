import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackers: [],
      products: [],
      selectedSnack: '',
      isSearching: false
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    const snackersData = 'https://s3.amazonaws.com/misc-file-snack/MOCK_SNACKER_DATA.json';

    const productsData = 'https://ca.desknibbles.com/products.json?limit=250';

    fetch(proxyUrl + snackersData)
      .then(res => res.json())
      .then(result => {
          this.setState({
            snackers: result,
            isSearching: true
          });
        }, error => {
          this.setState({
            error
          });
        });

    fetch(proxyUrl + productsData)
      .then(response => response.json())
      .then(result => {
        this.setState({
          products: result.products
        });

      }, error => {
        this.setState({
          dataError: error
        });
      });
  }

  handleSelectChange(event) {
    const { selectedSnack } = this.state;
    const value = event.target.value;
    this.setState({
      selectedSnack: value
    });
  };

  render() {
    const { snackers, products, selectedSnack } = this.state;
    const filteredSnackers = snackers.filter(snacker => snacker.fave_snack === selectedSnack);

    return (
      <div className="container">
        <h1>Snackers & Snacks</h1>
        <select onChange={this.handleSelectChange} value={selectedSnack}>
          <option value=''>Select Snack</option>
          {products.map((product, index) => {
            return (
              <option value={product.title}>{product.title} - {product.variants[0].price}</option>
            );
          })}
        </select>

        {filteredSnackers.length !== 0 &&
          <table className="snackers">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Favorite Snack</th>
                <th>Email</th>
                <th>Gender</th>
                <th>IP</th>
              </tr>
            </thead>

            {filteredSnackers.map((item, index) => {
              return (
                <tr className="item" key={`item-${index}`}>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.fave_snack}</td>
                  <td>{item.email}</td>
                  <td>{item.gender}</td>
                  <td>{item.ip_address}</td>
                </tr>
              );
            })}
          </table>
        }
      </div>
    );
  }
}

export default Search;
