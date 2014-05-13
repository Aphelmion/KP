/**
 * Created by Администратор on 30.03.14.
 */
var PointCtrl = {

    addPoint : function(event) {
        this.mouseDownEvent = event;
        var contains = PaintPanel.containsPoint(event);

        if(!contains) {

            var pointCoordinates = PaintPanel.getUsrCoordinatesOfMouse(event);
            var point = new AbstractPoint(pointCoordinates);
            var addPointCommand = new AddPointCommand(point);
            app.executeCommand(addPointCommand);

        }
    },

    clearPoints : function() {

    },

    movePoint : function(event) {
        var mouseDownCoordinates = PaintPanel.getUsrCoordinatesOfMouse(this.mouseDownEvent);
        var mouseUpCoordinates = PaintPanel.getUsrCoordinatesOfMouse(event);
        if (mouseDownCoordinates[0] != mouseUpCoordinates[0] && mouseDownCoordinates[1] != mouseUpCoordinates[1]){
            var movePointCommand = new MovePointCommand(event);
            app.executeCommand(movePointCommand);
        }
    }
}