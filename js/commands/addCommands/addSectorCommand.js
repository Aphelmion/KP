/**
 * Created by Admin on 10.05.14.
 */

function AddSectorCommand(point1, point2, point3) {

    this.point1 = point1;
    this.point2 = point2;
    this.point3 = point3;
    this.abstractSector = null;
}
AddSectorCommand.prototype.execute = function () {

    this.abstractSector = PaintPanel.createSector(this.point1, this.point2, this.point3);
    SectorCtrl.clearPoints();
};

AddSectorCommand.prototype.unExecute = function () {
    PaintPanel.removeElement(this.abstractSector);
    SectorCtrl.clearPoints();
    if(this.point1.isContainsOnBoard() && this.point2.isContainsOnBoard()) {
        return;
    }
    if (this.point1.isExist() ){
        SectorCtrl.addSectorPoint(this.point1);
    }
    if(this.point2.isExist() && !this.point2.isContainsOnBoard()) {
        SectorCtrl.addSectorPoint(this.point2);
    }
}