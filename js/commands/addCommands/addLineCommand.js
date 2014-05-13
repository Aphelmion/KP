/**
 * Created by Администратор on 05.04.14.
 */
function AddLineCommand(startPoint, endPoint) {

    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.abstractLine = null;
}

AddLineCommand.prototype.execute = function() {
    this.abstractLine = PaintPanel.createLine(this.startPoint, this.endPoint);
    LineCtrl.clearPoints();
};

AddLineCommand.prototype.unExecute = function() {

    PaintPanel.removeElement(this.abstractLine);
    if(this.startPoint.isExist() && !this.startPoint.isContainsOnBoard()) {
        LineCtrl.addStartPoint(this.startPoint);
    }
};