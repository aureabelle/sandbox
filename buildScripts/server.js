import express from 'express';
import path from 'path';
import open from 'open';

const port = 3000;
const app = express();

app.use(express.static('dist'));

 app.listen(port, error => {
  if(error) {
    console.log(error);
  } else {
    console.log(`Listening on port ${port}!`);
    open(`http://localhost:${port}`)
  }
});
