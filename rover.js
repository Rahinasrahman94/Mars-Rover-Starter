const Message = require("./message.js");
const Command = require("./command.js");
class Rover {
  constructor(position) {
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }
  receiveMessage(message) {
    let rov = {
      message: message.name,
      results: [],
    };
    let count = message.commands.length;
    for (let i = 0; i < count; i++) {
      if (
        message.commands[i].commandType === "MODE_CHANGE" &&
        message.commands[i].value
      ) {
        let mod = {
          completed: true,
        };
        this.mode = message.commands[i].value;
        rov.results.push(mod);
      } else if (message.commands[i].commandType === "STATUS_CHECK") {
        let stat = {
          completed: true,
          roverStatus: {
            mode: this.mode,
            position: this.position,
            generatorWatts: 110,
          },
        };
        // console.log(stat.roverStatus);
        rov.results.push(stat);
      } else if (
        message.commands[i].commandType === "MOVE" &&
        message.commands[i].value
      ) {
        if (this.mode === "LOW_POWER") {
          let mov = {
            completed: false,
          };
          rov.results.push(mov);
        } else {
          // console.log(this.position);
          this.position = message.commands[i].value;
          // console.log("from mov", this.position);
          let mov = {
            completed: true,
          };
          rov.results.push(mov);
        }
      }
    }
    return rov;
  }
}

let rover = new Rover(98382);
let commands = [
  //new Command("MODE_CHANGE", "LOW_POWER"),
  new Command("STATUS_CHECK"),
  new Command("MOVE", 12000),
  new Command("STATUS_CHECK"),
];
let message = new Message("Test message with two commands", commands);
let response = rover.receiveMessage(message);
console.log(response);

module.exports = Rover;
