/**
 * Created by Администратор on 30.03.14.
 */
function AddPointCommand(point) {
    this.point = point;
}

AddPointCommand.prototype.execute = function() {
    PaintPanel.createPoint(this.point);
    this.point.setExist(true);
};

AddPointCommand.prototype.unExecute = function() {
    PaintPanel.removePoint(this.point);
    this.point.setExist(false);
};
