import React, { Component } from "react";
import TeamList from "./TeamList";
import "../css/Players.css";

class AddEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      player: this.props.location.player,
      objectKey: this.props.match.params.id,
      name: "",
      jersey: "",
      height: "",
      weight: "",
      url: "",
      position: "",
      team: "",
      headshot: "",
      fetchDate: null,
      robotName: "",
    };
  }

  nameChange = (event) => this.setState({ name: event.target.value });
  jerseyChange = (event) => this.setState({ jersey: event.target.value });
  heightChange = (event) => this.setState({ height: event.target.value });
  weightChange = (event) => this.setState({ weight: event.target.value });
  urlChange = (event) => this.setState({ url: event.target.value });
  positionChange = (event) => this.setState({ position: event.target.value });
  teamChange = (event) => this.setState({ team: event.target.value });
  headshotChange = (event) => this.setState({ headshot: event.target.value });

  componentDidMount() {
    if (this.state.player) {
      this.setState({
        isLoaded: true,
      });
    } else if (this.state.objectKey === "") {
      // the user is adding a new player
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
      this.setState({
        player: p,
        isLoaded: true,
      });
    } else {
      fetch("https://localhost:44313/api/Players/" + this.state.objectKey)
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
    // assign player to this.state variables, for validation purposes
    const p = this.state.player;
    this.setState({
      team: p.team,
      headshot: p.headshot,
      name: p.name,
      jersey: p.jersey,
      position: p.position,
      height: p.height,
      weight: p.weight,
      url: p.url,
      fetchDate: p.fetchDate,
      robotName: p.robotName,
    });
  }

  submitHandler = (event) => {
    console.log(this.state);
    let errorMessages = "";
    const p = this.state;

    if (p.name === "") {
      errorMessages += "- Name cannot be blank\n";
    }
    if (p.jersey === "") {
      errorMessages += "- Jersey # cannot be blank\n";
    }
    if (p.team === "") {
      errorMessages += "- Please select the player's team\n";
    }
    if (p.position === "") {
      errorMessages += "- Please select the player's position\n";
    }
    event.preventDefault();
    if (errorMessages !== "") {
      alert(errorMessages);
    } else {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      };
      console.log(requestOptions);
      fetch(
        "https://localhost:44313/api/Players/" + this.state.objectKey,
        requestOptions
      ).then((res) => {
        return res;
      });
      this.props.history.push({
        pathname: "/roster/" + p.team,
        search: "?addedit",
      });
    }
  };

  render() {
    const { error, isLoaded, player } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <form onSubmit={this.submitHandler}>
            <table className="player-container-edit">
              <tbody>
                <tr>
                  <td width="30%" rowSpan="5">
                    <img
                      src={"../assets/player/" + player.headshot}
                      alt={player.name}
                      className="player-image"
                    />
                  </td>
                  <td align="left">
                    <label>Name: </label>
                    <input
                      type="text"
                      value={this.state.name}
                      onChange={this.nameChange}
                      size="50"
                    />
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    <label>Current Team: </label>
                    <TeamList
                      type="select"
                      value={this.state.team}
                      onChange={this.teamChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    <label>Jersey #: </label>
                    <input
                      type="text"
                      value={this.state.jersey}
                      onChange={this.jerseyChange}
                      size="5"
                    />
                    <label>Position: </label>
                    <select
                      value={this.state.position}
                      onChange={this.positionChange}
                    >
                      <option></option>
                      <option>Center</option>
                      <option>Center-Forward</option>
                      <option>Forward</option>
                      <option>Forward-Center</option>
                      <option>Forward-Guard</option>
                      <option>Guard</option>
                      <option>Guard-Forward</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <ul>
                      <li>
                        <label>Height: </label>
                        <input
                          type="text"
                          value={this.state.height}
                          onChange={this.heightChange}
                          size="10"
                        />
                      </li>
                      <li>
                        <label>Weight: </label>
                        <input
                          type="text"
                          value={this.state.weight}
                          onChange={this.weightChange}
                          size="10"
                        />
                      </li>
                      <li>
                        <label>NBA Profile: </label>
                        <input
                          type="text"
                          value={this.state.url}
                          onChange={this.urlChange}
                          size="40"
                        />
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <button type="submit" className="btn-submit">
                      OK
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </React.Fragment>
      );
    }
  }
}

export default AddEdit;
