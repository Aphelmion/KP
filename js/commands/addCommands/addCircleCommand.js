/**
 * Created by Администратор on 05.04.14.
 */

function AddCircleCommand(startPoint, endPoint) {

    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.abstractCircle = null;
}

AddCircleCommand.prototype.execute = function() {
    this.abstractCircle = PaintPanel.createCircle(this.startPoint, this.endPoint);
    CircleCtrl.clearPoints();
};

AddCircleCommand.prototype.unExecute = function() {

    PaintPanel.removeElement(this.abstractCircle);
    if(this.startPoint.isExist() && !this.startPoint.isContainsOnBoard()) {
        CircleCtrl.addStartPoint(this.startPoint);
    }
};