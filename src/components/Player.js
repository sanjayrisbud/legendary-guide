import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/Players.css";
import Team from "./Team";

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      player: [],
      id: this.props.match.params.id,
    };
  }
  componentDidMount() {
    fetch("https://localhost:44313/api/Players/" + this.state.id)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            player: result,
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

  confirmDelete(team) {
    if (window.confirm("Are you sure?")) {
      const requestOptions = {
        method: "DELETE",
      };
      fetch(
        "https://localhost:44313/api/Players/" + this.state.id,
        requestOptions
      ).then((res) => {
        return res.json();
      });
      this.props.history.push({
        pathname: "/roster/" + team,
        search: "?deleted",
      });
    }
  }

  render() {
    const { error, isLoaded, player } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <Team id={player.team} />
          <table className="player-container">
            <tbody>
              <tr>
                <td width="30%">
                  <img
                    src={"../assets/player/" + player.headshot}
                    alt={player.name}
                    className="player-image"
                  />
                </td>
                <td align="left">
                  <h1>{player.name}</h1>
                  <h2>
                    #{player.jersey}, {player.position}
                  </h2>
                  <ul>
                    <li>{player.height}</li>
                    <li>{player.weight}</li>
                    <li>
                      <a href={player.url} rel="noreferrer" target="_blank">
                        NBA Profile
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="btn-container" colSpan="2">
                  <Link
                    to={{
                      pathname: "/edit/" + player.objectKey,
                      player: player,
                    }}
                    className="btn-edit"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn-delete"
                    onClick={() => this.confirmDelete(player.team)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </React.Fragment>
      );
    }
  }
}
export default Player;
