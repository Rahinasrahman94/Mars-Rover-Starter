class Command {
  constructor(commandType, value) {
    this.commandType = commandType;
    if (!commandType) {
      throw Error("Command type required.");
    }
    this.value = value;
  }
}
let c = new Command("MOVE", "2500");
//console.log(c.value);
module.exports = Command;
