import express from 'express';
import path from 'path';
import open from 'open';
import Twitter from 'twitter';

const port = 3000;
const app = express();

const client = new Twitter({
  consumer_key: 'rAUwSbhv7eSUVWJS8VvEHWFtK',
  consumer_secret: 'pR69FVeHzO09fMXdsjKKLH3I0q91xNfgS3VqqKmeoyAv47rldM',
  access_token_key: '196196244-TTHTLTXJf4LYuG7iVH98EEuIvh7mBDM4wBVBY45t',
  access_token_secret: '6MDHTBCMYNKy8b8zSMBy6fcnUQWOSf9M8KeBEyGCOuiZc'
});

app.get('/tweets?:username', (req, res) => {
  client.get('statuses/user_timeline', {
    screen_name: req.query.username,
    count: 20
  }, (error, tweets, response) => {
    if(!error) {
      res.json({
        tweets: tweets
      });
    } else {
      res.status(404).send(error);
    }
  });
});

app.get('/search?:keyword', (req, res) => {
  client.get('search/tweets', {
    q: req.query.keyword
  }, (error, tweets, response) => {
    if(!error) {
      res.json({
        search: tweets
      });
    } else {
      res.status(404).send(error);
    }

  });
});

app.listen(port, error => {
  if(error) {
    console.log(error);
  } else {
    console.log(`Listening on port ${port}!`);
    open(`http://localhost:${port}`)
  }
});

app.use(express.static('dist'));