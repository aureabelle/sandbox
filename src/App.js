import React from 'react';
import ReactDOM from 'react-dom';

import Tweets from './Tweets';

const App = () => {
  return (
    <div>
      <Tweets />
    </div>
  );
};

export default App;

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
