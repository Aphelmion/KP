/**
 * Created by Администратор on 05.04.14.
 */
function AddDashedLineCommand(startPoint, endPoint) {

    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.abstractLine = null;
}

AddDashedLineCommand.prototype.execute = function() {
    this.abstractDashedLine = PaintPanel.createDashedLine(this.startPoint, this.endPoint);
    DashedLineCtrl.clearPoints();
};

AddDashedLineCommand.prototype.unExecute = function() {

    PaintPanel.removeElement(this.abstractDashedLine);
    if(this.startPoint.isExist() && !this.startPoint.isContainsOnBoard()) {
        DashedLineCtrl.addStartPoint(this.startPoint);
    }
};