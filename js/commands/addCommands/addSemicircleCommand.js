/**
 * Created by Konstantin on 12.05.14.
 */

function AddSemiCircleCommand(startPoint, endPoint) {

    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.abstractSemiCircle = null;
}

AddSemiCircleCommand.prototype.execute = function() {
    this.abstractSemiCircle = PaintPanel.createSemiCircle(this.startPoint, this.endPoint);
    SemiCircleCtrl.clearPoints();
};

AddSemiCircleCommand.prototype.unExecute = function() {

    PaintPanel.removeElement(this.abstractSemiCircle);
    if(this.startPoint.isExist() && !this.startPoint.isContainsOnBoard()) {
        SemiCircleCtrl.addStartPoint(this.startPoint);
    }
};