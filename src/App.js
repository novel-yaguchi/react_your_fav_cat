import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Navbar";
// import About from "./About";
import Comp from "./Comp";
import Comp2 from "./Comp2";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar />
            <hr />
            <Route exact path="/comp" component={Comp} />
            {/* <Route path="/About" component={About} /> */}
            <Route exact path="/comp2" component={Comp2} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
