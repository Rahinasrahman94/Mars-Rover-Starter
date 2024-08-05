const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function () {
  //test 7
  it("constructor sets position and default values for mode and generatorWatts", function () {
    let rovobj = new Rover("position");
    expect(rovobj.position).toBe("position");
    expect(rovobj.mode).toBe("NORMAL");
    expect(rovobj.generatorWatts).toBe(110);
  });
  //test 8
  it("response returned by receiveMessage contains the name of the message", function () {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    let message = new Message("Test message with two commands", commands);
    let rover = new Rover(98382); // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    //  console.log(response);
    expect(response.message).toBe("Test message with two commands");
  });
  //test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    //let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let rover = new Rover(98382);
    let message = new Message("Test message with two commands", [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ]);
    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    expect(response.results.length).toBe(message.commands.length);
  });
  //test 10
  it("responds correctly to the status check command", function () {
    let message = new Message("Test message with status commands", [
      //("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ]);
    let rover = new Rover(98382); // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    if (message.commands[0].commandType === "STATUS_CHECK") {
      expect(response.results[0]).toEqual({
        completed: true,
        roverStatus: {
          mode: "NORMAL",
          generatorWatts: 110,
          position: 98382,
        },
      });
    }
  });
  //test 11
  it("responds correctly to the mode change command", function () {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    let message = new Message("Test message with two commands", commands);
    let rover = new Rover(98382); // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    expect(rover.mode).toBe("LOW_POWER");
  });
  //test 12
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    let rover = new Rover(98382);
    let message = new Message("Test message with 2 commands", [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("MOVE", 1000),
    ]);
    let response = rover.receiveMessage(message);

    //  console.log(response.results[1])
    expect(response.results[1]).toEqual({ completed: false });
    // expect(response).tobe ("completed:false")
  });
  //test 13
  it("A MOVE command will update the rover’s position with the position value in the command.", function () {
    // let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let rover = new Rover(98382);
    let message = new Message("Test message  commands", [
      new Command("MOVE", 1000),
    ]);
    let response = rover.receiveMessage(message);
    console.log(response.results);
    expect(rover.position).toBe(1000);
  });
});
