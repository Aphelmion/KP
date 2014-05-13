/**
 * Created by Администратор on 08.04.14.
 */
function AddPolygonCommand(points) {

    this.points = points.slice();
    this.abstractPolygon = null;
}

AddPolygonCommand.prototype.execute = function () {
    this.abstractPolygon = PaintPanel.createPolygon(this.points);
    PolygonCtrl.clearPoints();
};

AddPolygonCommand.prototype.unExecute = function () {
    PaintPanel.removePolygon(this.abstractPolygon);
    PolygonCtrl.clearPoints();
    PolygonCtrl.points = this.points.slice();
};
