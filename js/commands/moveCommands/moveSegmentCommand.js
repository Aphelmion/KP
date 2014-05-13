/**
 * Created by Andrey on 10.05.2014.
 */
function MoveSegmentCommand(mouseUpEvent) {
    this.mouseDownEvent = app.controller.mouseDownEvent;
    this.mouseUpEvent = mouseUpEvent;
}

MoveSegmentCommand.prototype.execute = function() {
    if (!this.first){
        this.first = true;
        var currentElementWithCoordinates = PaintPanel.board.getAllUnderMouse(this.mouseUpEvent);
        var currentElement = currentElementWithCoordinates[0];
        if (currentElement != null){
            var inPaintPanelElement = PaintPanel.searchElement(currentElement);
            var point1 = inPaintPanelElement.getPoint1();
            var point2 = inPaintPanelElement.getPoint2();
            for (var i= 0, length = PaintPanel.points.length; i<length; ++i ){
                if (point1.id == PaintPanel.points[i].id){
                    PaintPanel.points[i].setPosition(JXG.COORDS_BY_USER, [point1.X(), point1.Y()]);
                }
                else if (point2.id == PaintPanel.points[i].id){
                    PaintPanel.points[i].setPosition(JXG.COORDS_BY_USER, [point2.X(), point2.Y()]);
                    break;
                }
            }
            PaintPanel.board.fullUpdate();
        }
    }
    else {
        var previousElementWithCoordinates = PaintPanel.board.getAllUnderMouse(this.mouseDownEvent);
        var previousElement = previousElementWithCoordinates[0];
        if (previousElement != null ){
            var inPaintPanelElement = PaintPanel.searchElement(previousElement);
            var point1 = inPaintPanelElement.getPoint1();
            var point2 = inPaintPanelElement.getPoint2();
            var coordinatesDown = PaintPanel.getUsrCoordinatesOfMouse(this.mouseDownEvent);
            var coordinatesUp = PaintPanel.getUsrCoordinatesOfMouse(this.mouseUpEvent);
            var deltaX = coordinatesUp[0] - coordinatesDown[0];
            var deltaY = coordinatesUp[1] - coordinatesDown[1];
            for (var i= 0, length = PaintPanel.points.length; i<length; ++i ){
                if (point1.id == PaintPanel.points[i].id){
                    point1.setPosition(JXG.COORDS_BY_USER, [point1.X()+deltaX, point1.Y()+deltaY]);
                    PaintPanel.points[i].setPosition(JXG.COORDS_BY_USER, [point1.X(), point1.Y()]);
                }
                if (point2.id == PaintPanel.points[i].id){
                    point2.setPosition(JXG.COORDS_BY_USER, [point2.X()+deltaX, point2.Y()+deltaY]);
                    PaintPanel.points[i].setPosition(JXG.COORDS_BY_USER, [point2.X(), point2.Y()]);
                    break;
                }
            }
            PaintPanel.board.fullUpdate();
        }
    }
};

MoveSegmentCommand.prototype.unExecute = function() {
    var currentElementWithCoordinates = PaintPanel.board.getAllUnderMouse(this.mouseUpEvent);
    var currentElement = currentElementWithCoordinates[0];
    if (currentElement != null ){
        var inPaintPanelElement = PaintPanel.searchElement(currentElement);
        var point1 = inPaintPanelElement.getPoint1();
        var point2 = inPaintPanelElement.getPoint2();
        var coordinatesDown = PaintPanel.getUsrCoordinatesOfMouse(this.mouseDownEvent);
        var coordinatesUp = PaintPanel.getUsrCoordinatesOfMouse(this.mouseUpEvent);
        var deltaX = coordinatesUp[0] - coordinatesDown[0];
        var deltaY = coordinatesUp[1] - coordinatesDown[1];
        for (var i= 0, length = PaintPanel.points.length; i<length; ++i ){
            if (point1.id == PaintPanel.points[i].id){
                point1.setPosition(JXG.COORDS_BY_USER, [point1.X()-deltaX, point1.Y()-deltaY]);
                PaintPanel.points[i].setPosition(JXG.COORDS_BY_USER, [point1.X(), point1.Y()]);
            }
            else if (point2.id == PaintPanel.points[i].id){
                point2.setPosition(JXG.COORDS_BY_USER, [point2.X()-deltaX, point2.Y()-deltaY]);
                PaintPanel.points[i].setPosition(JXG.COORDS_BY_USER, [point2.X(), point2.Y()]);
                break;
            }
        }
        PaintPanel.board.fullUpdate();
    }
};
