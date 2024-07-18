const Message = require('./message.js');
const Command = require('./command.js');
class Rover {

  constructor(position) {
    this.position = position;
    this.mode = 'Normal';
    this.generatorWatts = 110;
  }
  receiveMessage(message) {
     let rov = {
      message: message.name,
      results:[],
    }
    let count =  message.commands.length;
    for(let i=0;i<count;i++)
    {
      if(message.commands[i].commandType === "MODE_CHANGE")
      {
        if(this.mode === "LOW_POWER")
        {
          let mod={
            completed:false
          }
          rov.results.push(mod);
        }
        else{
          let mod = {
            completed:true
             }
             this.mode = message.commands[i].value;
             rov.results.push(mod);

        }
      }
      else if(message.commands[i].commandType === "STATUS_CHECK")
      {
        let stat={
          completed:true,
           roverStatus:{mode :this.mode,position :this.position, generatorWatts:110}
          }
        
        // let roverStatus = {
        //   mode : this.mode,
        //   position : this.position,
        //   generatorWatts:110
        // }
        //console.log(stat)
        //console.log(rov)
          rov.results.push(stat);
      } 
        else{
          
        let mov={
          completed:true
          }
        position = this.position;
        rov.results.push(mov);
      }
    }
//console.log(rov)
return rov;
}
}
let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);    // Passes 98382 as the rover's position.
let response = rover.receiveMessage(message);
console.log(response);

module.exports = Rover;