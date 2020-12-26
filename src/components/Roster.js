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

  getRoster() {
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

  componentDidMount() {
    if (this.state.id !== "undefined") this.getRoster();
  }

  componentDidUpdate() {
    if (this.props.location.search !== "") {
      this.props.location.search = "";
      this.getRoster();
    }
  }

  render() {
    const { error, isLoaded, players } = this.state;
    let html;
    if (error) {
      html = <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      html = <div>Loading...</div>;
    } else if (players.length === 0) {
      html = (
        <React.Fragment>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div align="center">
            <img src="../assets/nba-big-logo-500x275.png" alt="nba logo" />
          </div>
        </React.Fragment>
      );
    } else {
      html = (
        <React.Fragment>
          <Team id={this.state.id} />
          <div className="grid-container">
            {players.map((player) => (
              <div key={player.objectKey}>
                <table width="100%">
                  <tbody>
                    <tr>
                      <td width="25%">
                        <img
                          src={"../assets/player/" + player.headshot}
                          alt={player.jersey}
                          className="player-thumbnail"
                        />
                      </td>

                      <td width="10%">
                        <div className="player-jersey">{player.jersey}</div>
                      </td>
                      <td>
                        <div>
                          <Link
                            to={"/player/" + player.objectKey}
                            className="player-link"
                          >
                            {player.name}
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </React.Fragment>
      );
    }
    return html;
  }
}

export default Roster;
