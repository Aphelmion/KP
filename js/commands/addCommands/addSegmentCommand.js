/**
 * Created by Администратор on 31.03.14.
 */
function AddSegmentCommand(startPoint, endPoint) {

    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.abstractSegment = null;
}

AddSegmentCommand.prototype.execute = function() {
    this.abstractSegment = PaintPanel.createSegment(this.startPoint, this.endPoint);
    SegmentCtrl.clearPoints();
};

AddSegmentCommand.prototype.unExecute = function() {

    PaintPanel.removeElement(this.abstractSegment);
    if(this.startPoint.isExist() && !this.startPoint.isContainsOnBoard()) {
        SegmentCtrl.addStartPoint(this.startPoint);
    }
};