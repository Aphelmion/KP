/**
 * Created by Ruslan on 09.12.13.
 */

var PolygonCtrl = {

    points : [],
    sideOfThePolygon : [],
    sides : [],

    addPoint: function (event) {

        this.mouseDownEvent = event;

        var point = null;
        var contains = PaintPanel.containsPoint(event);
        var pointCoordinates = PaintPanel.getUsrCoordinatesOfMouse(event);
        this.points = this.points.filter(function(point) {return point.isExist()});

        if(!contains) {
            point = new AbstractPoint(pointCoordinates);
            var addPointCommand = new AddPointCommand(point);
            if(this.points.length > 0) {
                var macroCommand = new MacroCommand();
                var addSegmentCommand = new AddSegmentCommand(this.points[this.points.length - 1], point);
                this.sides.push(addSegmentCommand);
                macroCommand.addCommands(addPointCommand,addSegmentCommand);
                app.executeCommand(macroCommand);
            } else {
                app.executeCommand(addPointCommand);
            }
            this.addPolygonPoint(point);
        } else {
            point = PaintPanel.getExistingPoint(event);
            if(this.isReady(point)) {
                var macroCommand = new MacroCommand();
                var unExecuteMacroCommand = new UnExecuteMacroCommand();
                var addPolygonCommand = new AddPolygonCommand(this.points);
                unExecuteMacroCommand.addCommands(this.sides);
                macroCommand.addCommands(unExecuteMacroCommand, addPolygonCommand);
                app.executeCommand(macroCommand);
            } else {
                this.addPolygonPoint(point);
            }
        }
    },

    addPolygonPoint: function (point) {
        if(point) {
            this.points = this.points.filter(function(x) {return x.isExist()});
            this.points.push(point);
        }
    },

    validateStartPoint: function () {

        var ready = false, length = this.points.length, number = 0
        for(var  i = 0; i < length; i++) {
            if(this.points[i].isExist()) {
                number++;
            }
        }
        if(number >= 2) {
            ready = true;
        }
        return ready;
    },

    getExistingPoints : function() {
        var existPoints = [];
        for(var i = 0, length = this.points.length; i < length; i++) {
            if(this.points[i].isExist()) {
                existPoints.push(this.points[i]);
            }
        }
        return existPoints;
    },

    clearPoints : function() {

        this.points.length = 0;
    },

    removeTempSideOfThePolygon : function() {

        for(var i = 0; i < this.sideOfThePolygon.length; i++) {

            PaintPanel.removeElement(this.sideOfThePolygon[i]);
        }
    },

    isReady : function(point) {

        var ready = false;
        if(point.getX() == this.points[0].getX() && point.getY() == this.points[0].getY()) {
            ready = true;
        }
        return ready;
    },

    movePoint : function(event) {
        var mouseDownCoordinates = PaintPanel.getUsrCoordinatesOfMouse(this.mouseDownEvent);
        var mouseUpCoordinates = PaintPanel.getUsrCoordinatesOfMouse(event);
        if (mouseDownCoordinates[0] != mouseUpCoordinates[0] && mouseDownCoordinates[1] != mouseUpCoordinates[1]){
            var currentElementWithCoordinates = PaintPanel.board.getAllUnderMouse(this.mouseUpEvent);
            var currentElement = currentElementWithCoordinates[0];
            if (currentElement instanceof JXG.Line){
                var movePolygonCommand = new MovePolygonCommand(event);
                app.executeCommand(movePolygonCommand);
            }
            else if (currentElement instanceof JXG.Point){
                var movePointCommand = new MovePointCommand(event);
                app.executeCommand(movePointCommand);
            }
        }
    }

};
