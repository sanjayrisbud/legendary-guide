import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/Players.css";
import Team from "./Team";

class Roster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      players: [],
      id: this.props.match.params.id,
    };
  }
  componentDidMount() {
    fetch("https://localhost:44313/api/Players/team/" + this.state.id)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            players: result,
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
    const { error, isLoaded, players } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <Team id={this.state.id} />
          <table className="players-table">
            <tbody>
              {players.map((player) => (
                <tr key={player.objectKey} className="player-listing">
                  <td>
                    <img
                      src={"../assets/player/" + player.headshot}
                      alt={player.name}
                      className="player-thumbnail"
                    />
                  </td>
                  <td className="player-jersey">{player.jersey}</td>
                  <td>
                    <Link
                      to={"/player/" + player.objectKey}
                      className="player-link"
                    >
                      {player.name}
                    </Link>
                  </td>
                  <td className="player-position">{player.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      );
    }
  }
}

export default Roster;
