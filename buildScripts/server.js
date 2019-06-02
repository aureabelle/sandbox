import express from 'express';
import path from 'path';
import open from 'open';
import axios from 'axios';

import fs from 'fs';

const port = 3000;
const app = express();

let data = {};
let jsonLinks = [];
const initialToken = 'oS4dNgEvAH?';

data.links = jsonLinks;

const getLinks = async token => {
  try {

    const response = await axios.get(`https://master-7rqtwti-2nqdiganpwv5e.us-2.platformsh.site/${token}`, { headers: { 'Authorization': 'Basic aaa' } });

    if (response.data._links) {
      sendData(response.data._links);
      getLinks(response.data._links['next']);
    } else {
      fs.writeFile('data.json', JSON.stringify(data), 'utf8', (error) => {
        if (error) throw error;
        console.log('File created!');
      });
      // return data;
    }
  } catch (error) {
    return error;
  }
}

if (initialToken) {
  getLinks(initialToken);
}

const sendData = link => {
  jsonLinks.push(link);
};

app.listen(port, error => {
  if(error) {
    console.log(error);
  } else {
    console.log(`Listening on port ${port}!`);
  }
});

app.use(express.static('dist'));