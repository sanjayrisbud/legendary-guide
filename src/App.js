import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Sidebar from "react-sidebar";
import Roster from "./components/Roster";
import TeamList from "./components/TeamList";
import "./App.css";
import Player from "./components/Player";
import AddEdit from "./components/AddEdit";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
      player: null,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.addHandler = this.addHandler.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  addHandler() {
    let p = [];
    p.name = "";
    p.jersey = "";
    p.height = "";
    p.weight = "";
    p.url = "";
    p.position = "";
    p.team = "";
    p.headshot = "blank.jpeg";
    p.fetchDate = Date();
    p.robotName = "reactjs-nba-app";
    this.setState({ player: p });
    console.log();
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Sidebar
            sidebar={<TeamList sidebarOpen={this.onSetSidebarOpen} />}
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            styles={{ sidebar: { background: "white" } }}
          >
            <button
              onClick={() => this.onSetSidebarOpen(true)}
              className="btn-select"
            >
              ❮ Select team
            </button>
            <Link
              to={{
                pathname: "/add",
                player: {
                  name: "",
                  jersey: "",
                  height: "",
                  weight: "",
                  url: "",
                  position: "",
                  team: "",
                  headshot: "blank.jpeg",
                  fetchDate:
                    new Date().getMonth() +
                    1 +
                    "/" +
                    new Date().getDate() +
                    "/" +
                    new Date().getFullYear(),
                  robotName: "reactjs-nba-app",
                },
              }}
              className="btn-add"
            >
              Add player
            </Link>
            <Switch>
              <Route path="/" exact component={Roster} key={Date()} />
              <Route path="/roster/:id" component={Roster} key={Date()} />
              <Route path="/player/:id" component={Player} key={Date()} />
              <Route path="/edit/:id" component={AddEdit} key={Date()} />
              <Route path="/add" component={AddEdit} key={Date()} />
            </Switch>
          </Sidebar>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
