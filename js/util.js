/**
 * Created by Администратор on 09.12.13.
 * test
 */
function Point(x, y){

    this.x = x;
    this.y = y;
}
Point.prototype.getX = function() {
    return this.x;
};

Point.prototype.getY = function() {

    return this.y;
};

/*Point.prototype.setCoordinates = function(coordinates) {
    this.x = coordinates[0];
    this.y = coordinates[1];
}*/

function AbstractLine(line, startLength) {

    this.line = line;
    this.length = startLength;
}

AbstractLine.prototype.getParam = function() {
    return this.length;
};
AbstractLine.prototype.getObject = function() {
    return this.line;
};
AbstractLine.prototype.getInfo = function() {
    var lineName = this.line.point1.name + this.line.point2.name;
    return "Длина отрезка " + lineName + " = " + this.length;
};
AbstractLine.prototype.setParam = function(param) {
    this.length = param;
};
AbstractLine.prototype.getPoint1 = function() {
    return this.line.point1;
};
AbstractLine.prototype.getPoint2 = function() {
    return this.line.point2;
};
AbstractLine.prototype.getName = function() {
    return this.length.point1.name + this.length.point2.name;
};

function AbstractDashedLine(line, startLength) {

    this.line = line;
    this.length = startLength;
}

AbstractDashedLine.prototype.getParam = function() {
    return this.length;
};
AbstractDashedLine.prototype.getObject = function() {
    return this.line;
};
AbstractDashedLine.prototype.getInfo = function() {
    var lineName = this.line.point1.name + this.line.point2.name;
    return "Длина отрезка " + lineName + " = " + this.length;
};
AbstractDashedLine.prototype.setParam = function(param) {
    this.length = param;
};
AbstractDashedLine.prototype.getPoint1 = function() {
    return this.line.point1;
};
AbstractDashedLine.prototype.getPoint2 = function() {
    return this.line.point2;
};
AbstractDashedLine.prototype.getName = function() {
    return this.length.point1.name + this.length.point2.name;
};


function AbstractEllipse(ellipse, focalLength){
    this.ellipse = ellipse;
    this.focalLength = focalLength;
}
AbstractEllipse.prototype.getParam = function() {
    return this.focalLength;
};
AbstractEllipse.prototype.getObject = function() {
    return this.ellipse;
};
AbstractEllipse.prototype.getInfo = function() {
    return "Фокальное расстояние = " + this.focalLength;
};
AbstractEllipse.prototype.setParam = function(param) {
    this.focalLength = param;
};
AbstractEllipse.prototype.getPoint1 = function() {
    return null;
};
AbstractEllipse.prototype.getPoint2 = function() {
    return null;
};

//todo







function AbstractSemiCircle(semicircle, radius) {

    this.semicircle = semicircle;
    this.radius = radius;
}
AbstractSemiCircle.prototype.getParam = function() {
    return this.radius;
};
AbstractSemiCircle.prototype.getObject = function() {
    return this.semicircle;
};
AbstractSemiCircle.prototype.getInfo = function() {
    return "Радиус полуокружности = " + this.radius;
};
AbstractSemiCircle.prototype.setParam = function(param) {
    this.radius = param;
};
AbstractSemiCircle.prototype.getPoint1 = function() {
    return this.semicircle.center;
};
AbstractSemiCircle.prototype.getPoint2 = function() {
    return this.semicircle.point2;
};

function AbstractSector(sector, value) {

    this.sector = sector;
    this.value = value;
}

AbstractSector.prototype.getParam = function() {
    return this.value;
};
AbstractSector.prototype.getObject = function() {
    return this.sector;
};
AbstractSector.prototype.getInfo = function() {
    return "Значение сектора = " + this.value;
};
AbstractSector.prototype.setParam = function(param) {
    this.value = param;
};
AbstractSector.prototype.getPoint1 = function() {
    return null;
};
AbstractSector.prototype.getPoint2 = function() {
    return null;
};

function AbstractCircle(circle, radius) {

    this.circle = circle;
    this.radius = radius;
}
AbstractCircle.prototype.getParam = function() {
    return this.radius;
};
AbstractCircle.prototype.getObject = function() {
    return this.circle;
};
AbstractCircle.prototype.getInfo = function() {
    return "Радиус окружности = " + this.radius;
};
AbstractCircle.prototype.setParam = function(param) {
    this.radius = param;
};
AbstractCircle.prototype.getPoint1 = function() {
    return this.circle.center;
};
AbstractCircle.prototype.getPoint2 = function() {
    return this.circle.point2;
};


function AbstractAngle(angle, value) {

    this.angle = angle;
    this.value = value;

}
AbstractAngle.prototype.getParam = function() {
    return this.value;
};
AbstractAngle.prototype.getObject = function() {
    return this.angle;
};
AbstractAngle.prototype.getInfo = function() {
    return "Значение угла = " + this.value;
};
AbstractAngle.prototype.setParam = function(param) {
    this.value = param;
};
AbstractAngle.prototype.getPoint1 = function() {
    return null;
};
AbstractAngle.prototype.getPoint2 = function() {
    return null;
};


function AbstractPolygon(polygon, sideOfTheAbstractPolygon) {

    this.polygon = polygon;
    this.sideOfTheAbstractPolygon = sideOfTheAbstractPolygon;
}
AbstractPolygon.prototype.containsSide = function(side) {
    var contains = false;
    var sideOfThePolygon = this.polygon.borders;
    for(var i = 0; i < sideOfThePolygon.length; i++) {

        if(((side.point1 == sideOfThePolygon[i].point1 && side.point2 == sideOfThePolygon[i].point2)
            || (side.point1 == sideOfThePolygon[i].point2 && side.point2 == sideOfThePolygon[i].point1))) {
            contains = true;
            break;
        }
    }
    return contains;
};
AbstractPolygon.prototype.getObject = function() {
    return this.polygon;
};
AbstractPolygon.prototype.getPerimeter = function() {
    var perimeter = 0;
    for(var i = 0; i < this.sideOfTheAbstractPolygon.length; i++) {

        perimeter += parseInt(this.sideOfTheAbstractPolygon[i].getParam());
    }
    return perimeter;
};
AbstractPolygon.prototype.getInfo = function() {
    var name = this.getPolygonName();
    return "Периметр фигуры " + name + " = " + this.getPerimeter();
};
AbstractPolygon.prototype.getPolygonName = function() {

    var name = " ";
    for(var i = 0; i < this.sideOfTheAbstractPolygon.length; i++) {

        var points = this.polygon.vertices;
        for(var i = 0, j = 0; i < points.length - 1; i++, j++){
            if(j++ > 9) {
                name += "\n";
                j = 0;
            }
            name += points[i].name;
        }
    }
    name.replace(" ", "");
    return name;
};


function AbstractPoint(pointCoordinates) {

    //this.point = point;
    this.pointCoordinates = pointCoordinates;
    this.exist = true;
    this.containsOnBoard = false;
}
AbstractPoint.prototype.getCoordinates = function(){
    return this.pointCoordinates;
};
AbstractPoint.prototype.getX = function() {
    return this.pointCoordinates[0];
};
AbstractPoint.prototype.getY = function() {
    return this.pointCoordinates[1];
};
AbstractPoint.prototype.setExist = function(exist) {
    this.exist = exist;
};
AbstractPoint.prototype.isExist = function() {
    return this.exist;
};
AbstractPoint.prototype.setCoordinates = function(pointCoordinates) {
    this.pointCoordinates = pointCoordinates;
};
AbstractPoint.prototype.setContainsOnBoard = function(containsOnBoard) {
    this.containsOnBoard = containsOnBoard;
};
AbstractPoint.prototype.isContainsOnBoard = function() {
    return this.containsOnBoard;
};
AbstractPoint.prototype.toString = function() {
    return  "{" + "AbstractPoint : x = " + this.getX() + ", y = " + this.getY() + "}";
};

