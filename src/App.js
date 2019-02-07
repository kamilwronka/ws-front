import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";

const socket = io.connect("localhost:3000");

class App extends Component {
  state = {
    x: 0,
    y: 0,
    players: []
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);

    socket.on("move", data => {
      this.setState({ x: data.x, y: data.y });
    });

    socket.on("onlineplayers", players => {
      this.setState({ players });
    });
  }

  getDirection = keyCode => {
    switch (keyCode) {
      case 87:
      case 38:
        return "up";
      case 83:
      case 40:
        return "down";
      case 65:
      case 37:
        return "left";
      case 39:
      case 68:
        return "right";
      default:
    }
  };

  handleKeyPress = e => {
    const data = {
      direction: this.getDirection(e.keyCode)
    };
    console.log(data);
    socket.emit("move", data);
  };

  

  render() {
    const { x, y } = this.state;
    console.log(x, y * 50);
    return (
      <div style={{ height: 500, width: 500, backgroundColor: "#cccccc" }}>
        {
          for(let player in this.state.players) {
          console.log(player)
        }}

        {this.state.players.map(player => {
          return (
            <div
              style={{
                height: 50,
                width: 50,
                backgroundColor: "red",
                transform: `translateY(${-y * 50}px) translateX(${x * 50}px)`,
                transition: "0.15s"
              }}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
