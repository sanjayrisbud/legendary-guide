import React, { Component } from "react";
import "../css/Teams.css";

class Team extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      team: null,
      id: this.props.id,
    };
  }
  componentDidMount() {
    fetch("https://localhost:44313/api/teams/" + this.state.id)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            team: result,
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
    const { error, isLoaded, team } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <table className="team-container">
            <tr>
              <td rowSpan="2" width="5%" height="5%">
                <img
                  src={"../assets/team/" + team.logo}
                  alt={team.name}
                  className="team-logo-big"
                />
              </td>
              <td>
                <div className="team-city-big">{team.city.toLowerCase()}</div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="team-name-big">{team.name}</div>
              </td>
            </tr>
          </table>
        </React.Fragment>
      );
    }
  }
}
export default Team;
