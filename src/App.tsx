import React from 'react';
import './style/App.scss';
import Navigation from './Navigation';
import Home from './views/pages/Home';
import Find from './views/pages/Find';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">

      {/* <Find /> */}
      <Router>
        <Navigation />
        <Route exact path="/" component={Home} />
        <Route path="/find" component={Find} />
      </Router>
    </div>
  );
}

export default App;
