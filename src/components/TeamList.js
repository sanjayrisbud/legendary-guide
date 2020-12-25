import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/Teams.css";

class TeamList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      teams: [],
    };
  }
  componentDidMount() {
    fetch("https://localhost:44313/api/teams")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            teams: result,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, teams } = this.state;
    let html = null;
    if (error) {
      html = <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      html = <div>Loading...</div>;
    } else if (this.props.type === "select") {
      html = (
        <select value={this.props.value} onChange={this.props.onChange}>
          <option></option>
          {teams.map((team) => (
            <option
              key={team.id}
              value={team.id}
            >{`${team.city} ${team.name}`}</option>
          ))}
        </select>
      );
    } else {
      html = (
        <div>
          {teams.map((team) => (
            <div key={team.id} onClick={() => this.props.sidebarOpen(false)}>
              <Link to={"/roster/" + team.id} className="team-link">
                <img
                  src={"../assets/team/" + team.logo}
                  alt={team.name}
                  className="team-logo"
                />
                <span className="team-name">
                  {team.city} {team.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      );
    }
    return html;
  }
}

export default TeamList;
