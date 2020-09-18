import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import EditItem from "./components/items";
import AddItem from "./components/addItems";
import Home from "./components/home";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="container">
          <Switch>
            <Route path="/additem" component={AddItem}></Route>
            <Route path="/edit/:id" component={EditItem}></Route>
            {/* fatal error: i missed /:id */}
            <Route path="/" exact component={Home}></Route>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
