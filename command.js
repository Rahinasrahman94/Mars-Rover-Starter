class Command {
   constructor(commandType, value) {
     this.commandType = commandType;
     if (!commandType) {
       throw Error("Command type required.");
     }
     this.value = value;
   }
 
 }
 let c= new Command('MODE_CHANGE', 'LOW_POWER');
 //console.log(c.commandType)
 module.exports = Command;