import React, { Component } from 'react';
import { Table, Select, Alert, Icon } from 'antd';
import fetch from 'node-fetch';

const Option = Select.Option;
const columns = [
  {
    title: 'First Name',
    dataIndex: 'first_name',
  },
  {
    title: 'Last Name',
    dataIndex: 'last_name',
  },
  {
    title: 'Favorite Snack',
    dataIndex: 'fave_snack',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'IP',
    dataIndex: 'ip_address',
  },
  {
    title: 'ID',
    dataIndex: 'id',
  },
];

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackers: [],
      products: [],
      selectedSnack: '',
      isSearching: false,
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

  handleSelectChange(value) {
    const { selectedSnack, snackers } = this.state;
    this.setState({
      selectedSnack: value
    });
  };

  render() {
    const { snackers, products, selectedSnack } = this.state;
    const filteredSnackers = snackers.filter(snacker => snacker.fave_snack === selectedSnack);
    const snackersList = filteredSnackers.length !== 0 ? filteredSnackers : snackers;
    const existInInventory = snackers.some(snacker => snacker.fave_snack === selectedSnack);

    return (
      <div className="container">
        <h1>Find snackers who like</h1>

        <div className="dropdown">
          <Select
            defaultValue={selectedSnack}
            onChange={this.handleSelectChange}
          >
            <Option value=''>Select Snack</Option>
            {products.map((product, index) => {
              return (
                <Option value={product.title}>{product.title} - {product.variants[0].price}</Option>
              );
            })}
          </Select>
        </div>

        {(!existInInventory && selectedSnack !== '')  &&
          <div className="message">
            <Alert
              message={`Nobody likes ${selectedSnack}.`}
              type="error"
              showIcon
              icon={<Icon type="frown" />}
            />
          </div>
        }

        <Table
          dataSource={snackersList}
          columns={columns}
        />
      </div>
    );
  }
}

export default Search;
