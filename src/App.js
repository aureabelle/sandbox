import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search';

import 'antd/dist/antd.css';
import './app.css';

const App = () => {
  return (
    <div>
      <Search />
    </div>
  );
};

export default App;

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
