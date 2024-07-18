const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts",function() {
    let rovobj = new Rover('position');
    expect(rovobj.position).toBe("position");
    expect(rovobj.mode).toBe('Normal');
    expect(rovobj.generatorWatts).toBe(110);
});
it("response returned by receiveMessage contains the name of the message",function() {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);    // Passes 98382 as the rover's position.
  let response = rover.receiveMessage(message);
 //  console.log(response);
expect(response.message).toBe("Test message with two commands");
});
it("response returned by receiveMessage includes two results if two commands are sent in the message",function() {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);    // Passes 98382 as the rover's position.
  let response = rover.receiveMessage(message);
 //  console.log(response);
expect(response.message.commands).toBe([Command][Command]);
});
it('responds correctly to the status check command',function() {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);    // Passes 98382 as the rover's position.
  let response = rover.receiveMessage(message);
if(message.commands[0].commandType === "STATUS_CHECK")
{
  expect(response).toBe( {
    completed: true, 
    roverStatus: { mode: 'LOW_POWER', generatorWatts: 110, position: 98382 }
 })
}
});
it("responds correctly to the mode change command",function() {
 let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);    // Passes 98382 as the rover's position.
  let response = rover.receiveMessage(message);
  if(message.commands[0].commandType === "MODE_CHANGE" && message.commands[0].value ==="Normal")
    {
      expect(response).toBe("completed:true")
    }
});

it("responds with a false completed value when attempting to move in LOW_POWER mode",function() {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
   let message = new Message('Test message with two commands', commands);
   let rover = new Rover(98382);    // Passes 98382 as the rover's position.
   let response = rover.receiveMessage(message);
   if(this.mode === "LOW_POWER")
   {
    expect(response).toBe("completed:false")
   }
  });
   it("A MOVE command will update the rover’s position with the position value in the command.",function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
     let message = new Message('Test message with two commands', commands);
     let rover = new Rover(98382);    // Passes 98382 as the rover's position.
     let response = rover.receiveMessage(message);
     if(message.commands[0].commandType === "MOVE")
     {
     expect(response).toBe(98382)
     }
 });

});
