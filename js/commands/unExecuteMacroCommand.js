/**
 * Created by Admin on 21.04.14.
 */
function UnExecuteMacroCommand() {

    this.commands = [];
}

UnExecuteMacroCommand.prototype.unExecute = function() {
    for(var i = 0, length = this.commands.length; i < length; i++) {
        this.commands[i].execute();
    }
};

UnExecuteMacroCommand.prototype.execute = function(){
    for(var i = this.commands.length - 1; i >= 0; i--) {
        this.commands[i].unExecute();
    }
};

UnExecuteMacroCommand.prototype.addCommands = function() {
    MacroCommand.prototype.addCommands.apply(this, arguments);
};