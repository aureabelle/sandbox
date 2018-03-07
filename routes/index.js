import express from 'express';
import Twitter from 'twitter';

const router = express.Router();
const client = new Twitter({
  consumer_key: 'rAUwSbhv7eSUVWJS8VvEHWFtK',
  consumer_secret: 'pR69FVeHzO09fMXdsjKKLH3I0q91xNfgS3VqqKmeoyAv47rldM',
  access_token_key: '196196244-TTHTLTXJf4LYuG7iVH98EEuIvh7mBDM4wBVBY45t',
  access_token_secret: '6MDHTBCMYNKy8b8zSMBy6fcnUQWOSf9M8KeBEyGCOuiZc'
});

router.get('/', (req, res, next) => {
  client.get('statuses/user_timeline', {
    screen_name: 'nodejs',
    count: 20
  }, (error, tweets, response) => {
    if(!error) {
      res.status(200).render('index', { title: 'Express', tweets: tweets });
    } else {
      res.status(500).json({ error: error });
    }
  });
});

module.exports = router;
