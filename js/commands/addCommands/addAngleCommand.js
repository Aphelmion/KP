/**
 * Created by Администратор on 06.04.14.
 */
function AddAngleCommand(point1, point2, point3) {

    this.point1 = point1;
    this.point2 = point2;
    this.point3 = point3;
    this.abstractAngle = null;
}
AddAngleCommand.prototype.execute = function () {

    this.abstractAngle = PaintPanel.createAngle(this.point1, this.point2, this.point3);
    AngleCtrl.clearPoints();
};

AddAngleCommand.prototype.unExecute = function () {
    PaintPanel.removeElement(this.abstractAngle);
    AngleCtrl.clearPoints();
    if(this.point1.isContainsOnBoard() && this.point2.isContainsOnBoard()) {
        return;
    }
    if (this.point1.isExist() ){
        AngleCtrl.addAnglePoint(this.point1);
    }
    if(this.point2.isExist() && !this.point2.isContainsOnBoard()) {
        AngleCtrl.addAnglePoint(this.point2);
    }
}