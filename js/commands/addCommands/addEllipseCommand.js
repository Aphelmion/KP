/**
 * Created by Администратор on 05.04.14.
 */

function AddEllipseCommand(startPoint, endPoint, point) {

    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.point = point;
    this.abstractEllipse = null;
}

AddEllipseCommand.prototype.execute = function() {
    this.abstractEllipse = PaintPanel.createEllipse(this.startPoint, this.endPoint, this.point);
    EllipseCtrl.clearPoints();
};

AddEllipseCommand.prototype.unExecute = function () {
    PaintPanel.removeElement(this.abstractEllipse);
   EllipseCtrl.clearPoints();
    if (this.startPoint.isContainsOnBoard() && this.endPoint.isContainsOnBoard()) {
        return;
    }
    if (this.startPoint.isExist()) {
        EllipseCtrl.addEllipsePoint(this.startPoint);
    }
    if (this.endPoint .isExist() && !this.endPoint .isContainsOnBoard()) {
        EllipseCtrl.addEllipsePoint(this.endPoint );
    }
};



