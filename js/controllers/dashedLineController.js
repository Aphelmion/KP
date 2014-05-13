/**
 * Created by Администратор on 09.12.13.
 */

var DashedLineCtrl = {

    points: [],

    addPoint: function (event) {

        this.mouseDownEvent = event;

        var point = null;
        var contains = PaintPanel.containsPoint(event);
        var pointCoordinates = PaintPanel.getUsrCoordinatesOfMouse(event);

        if (this.validateStartPoint() && !contains) {
            point = new AbstractPoint(pointCoordinates);
            var macroCommand = new MacroCommand();
            var addPointCommand = new AddPointCommand(point);
            var addDashedLineCommand = new AddDashedLineCommand(this.points[this.points.length - 1], point);
            macroCommand.addCommands(addPointCommand, addDashedLineCommand);
            app.executeCommand(macroCommand);
            this.clearPoints();
        } else {
            if (!contains) {
                point = new AbstractPoint(pointCoordinates);
                var addPointCommand = new AddPointCommand(point);
                app.executeCommand(addPointCommand);
            } else {
                point = PaintPanel.getExistingPoint(event);
            }
            if (point != null) {
                this.points.push(point);
            }
        }

        if (this.points.length == 2) {
            var addDashedLineCommand = new AddDashedLineCommand(this.points[0], this.points[1]);
            app.executeCommand(addDashedLineCommand);
            this.clearPoints();
        }
    },

    clearPoints: function () {

        this.points.length = 0;
    },

    addStartPoint: function (point) {

        //alert("len = " + this.points.length)
        if (this.points.length < 1) {
            this.points.push(point);
        } else {
            this.clearPoints();
            this.points.push(point);
        }
    },

    validateStartPoint: function () {

        var ready = false;

        if (this.points.length != 0) {
            if (this.points[this.points.length - 1].isExist()) {
                ready = true;
            }
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
                var moveDashedLineCommand = new MoveDashedLineCommand(event);
                app.executeCommand(moveDashedLineCommand);
            }
            else if (currentElement instanceof JXG.Point){
                var movePointCommand = new MovePointCommand(event);
                app.executeCommand(movePointCommand);
            }
        }
    }

};