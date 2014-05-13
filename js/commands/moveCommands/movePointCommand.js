/**
 * Created by Andrey on 10.05.2014.
 */
function MovePointCommand(mouseUpEvent) {
    this.mouseDownEvent = app.controller.mouseDownEvent;
    this.mouseUpEvent = mouseUpEvent;
}

MovePointCommand.prototype.execute = function() {
    var currentPoint = PaintPanel.getExistingPoint(this.mouseUpEvent);
    if (currentPoint != null){
        for (var i= 0, length = PaintPanel.points.length; i<length; ++i ){
            if (currentPoint.getX() == PaintPanel.points[i].X() && currentPoint.getY() == PaintPanel.points[i].Y()){
                currentPoint.setCoordinates(PaintPanel.getUsrCoordinatesOfMouse(this.mouseUpEvent));
                PaintPanel.points[i].setPosition(JXG.COORDS_BY_USER, currentPoint.getCoordinates());
                PaintPanel.board.fullUpdate();
                break;
            }
        }
    }
    else{
        var previousPoint = PaintPanel.getExistingPoint(this.mouseDownEvent);
        if (previousPoint != null){
            for (var i= 0, length = PaintPanel.points.length; i<length; ++i){
                if (previousPoint.getX() == PaintPanel.points[i].X() && previousPoint.getY() == PaintPanel.points[i].Y()){
                    previousPoint.setCoordinates(PaintPanel.getUsrCoordinatesOfMouse(this.mouseUpEvent));
                    PaintPanel.points[i].setPosition(JXG.COORDS_BY_USER, previousPoint.getCoordinates());
                    PaintPanel.board.fullUpdate();
                    break;
                }
            }
        }
        else{
            alert("currentPoint and previousPoint has been not found");
        }
    }
};

MovePointCommand.prototype.unExecute = function() {
    var currentPoint = PaintPanel.getExistingPoint(this.mouseUpEvent);
    if (currentPoint != null){
        for (var i= 0, length = PaintPanel.points.length; i<length; ++i ){
            if (currentPoint.getX() == PaintPanel.points[i].X() && currentPoint.getY() == PaintPanel.points[i].Y()){
                currentPoint.setCoordinates(PaintPanel.getUsrCoordinatesOfMouse(this.mouseDownEvent));
                PaintPanel.points[i].setPosition(JXG.COORDS_BY_USER, currentPoint.getCoordinates());
                PaintPanel.board.fullUpdate();
                break;
            }
        }
    }
    else{
        alert("MovePointCommand.unExecute cant find point in coordinates: " + JSON.stringify(PaintPanel.getExistingPoint(this.mouseUpEvent)));
    }
};
