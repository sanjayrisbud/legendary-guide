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
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
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
  }
}

export default TeamList;
