const Message = require("./message.js");
const Command = require("./command.js");
class Rover {
  constructor(position) {
    this.position = position;
    this.mode = "Normal";
    this.generatorWatts = 110;
  }
  receiveMessage(message) {
    let rov = {
      message: message.name,
      results: [],
    };
    let count = message.commands.length;
    for (let i = 0; i < count; i++) {
      if (message.commands[i].commandType === "MODE_CHANGE") {
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
            generatorwatts: 110,
          },
        };
        //  console.log(stat.roverStatus);
        rov.results.push(stat);
      } else {
        if (this.mode === "LOW_POWER") {
          let mov = {
            completed: false,
          };

          rov.results.push(mov);
        } else {
          let mov = {
            completed: true,
          };
          this.position = message.commands[i].value;
          console.log(message.commands[i].value);
          rov.results.push(mov);
        }
      }
    }
    return rov;
  }
}
let commands = [
  new Command("MODE_CHANGE", "LOW_POWER"),
  new Command("STATUS_CHECK"),
];
let message = new Message("Test message with two commands", commands);
let rover = new Rover(98382);
let response = rover.receiveMessage(message);
console.log(response);
//console.log(rover.stat.roverStatus)
module.exports = Rover;
