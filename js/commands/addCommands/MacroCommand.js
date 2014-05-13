/**
 * Created by Администратор on 01.04.14.
 */

function MacroCommand() {

    this.commands = [];
}

MacroCommand.prototype.execute = function() {
    for(var i = 0, length = this.commands.length; i < length; i++) {
        this.commands[i].execute();
    }
};

MacroCommand.prototype.unExecute = function(){
    for(var i = this.commands.length - 1; i >= 0; i--) {
        this.commands[i].unExecute();
    }
};

MacroCommand.prototype.addCommands = function() {
    for(var i = 0, length = arguments.length; i < length; i++) {
        if(arguments[i] instanceof Array) {
            var array = arguments[i];
            for(var j = 0, len = array.length; j < len; j++) {
                this.commands.push(array[j]);
            }
        } else {
            this.commands.push(arguments[i]);
        }
    }
};