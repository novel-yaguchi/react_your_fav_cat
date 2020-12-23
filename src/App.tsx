import React from 'react';
import './style/App.scss';
import Navigation from './Navigation';
import Home from './views/pages/Home';
import Find from './views/pages/Find';
import Modal from './views/pages/Modal';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Navigation} />
        <Route path="/" exact component={Home} />
        <Route path="/find" exact component={Find} />
      </Router>
    </div>
  );
}

export default App;
