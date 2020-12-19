import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "react-sidebar";
import Roster from "./components/Roster";
import TeamList from "./components/TeamList";
import "./App.css";
import Player from "./components/Player";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
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
            <Switch>
              <Route path="/roster/:id" component={Roster} key={Date()} />
              <Route path="/player/:id" component={Player} key={Date()} />
            </Switch>
          </Sidebar>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
