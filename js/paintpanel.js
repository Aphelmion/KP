/**
 * Created by Администратор on 07.12.13.
 */

var PaintPanel = {

    elements : [],
    points : [],
    board : null,
    showGrid : true,
    polygons : [],

    createBoard : function() {
        this.board = JXG.JSXGraph.initBoard('board', {boundingbox: [-20, 20, 20, -20], showCopyright : false, grid : this.showGrid});
    },


    showElementInfo : function(event) {

        var p = this.board.getAllUnderMouse(event);

        if(p.length > 1) {

            var element = p[0];
            if(element instanceof  JXG.Line) {

               var polygon = this.getPolygon(element);
                if(polygon != null){
                    var lineName = element.point1.name + element.point2.name;
                    document.getElementById("containsInfo").innerHTML = "Отрезок " + lineName + " принадлежит фигуре " + polygon.getPolygonName();
                    document.getElementById("polygonInfo").innerHTML = polygon.getInfo();
                }
            }

            var abstractElement = this.searchElement(element);
            if(abstractElement != null) {

                document.getElementById("info").innerHTML = abstractElement.getInfo();
            }

        }else {
            document.getElementById("info").innerHTML = " ";
            document.getElementById("polygonInfo").innerHTML = " ";
            document.getElementById("containsInfo").innerHTML = " ";
        }

    },

    showContainsInfo : function(event) {

        var p = this.board.getAllUnderMouse(event);
        if(p.length > 2 ) {
            var element = p[0];
            if(element instanceof JXG.Line) {
                for(var i = 0; i < p.length; i++) {
                    if(p[i] instanceof  JXG.Point) {

                        var lineName = element.point1.name + element.point2.name;
                        var pointNme = p[i].name;
                        if(element.getAttribute("straightFirst")) {
                            document.getElementById("containsInfo").innerHTML = "Точка " + pointNme + " принадлежит прямой " + lineName;
                        } else {
                            document.getElementById("containsInfo").innerHTML = "Точка " + pointNme + " отрезку " + lineName;
                        }
                        break;
                    }
                }
            } else if(element instanceof  JXG.Circle){

                for(var i = 0; i < p.length; i++) {
                    if(p[i] instanceof  JXG.Point) {
                        var circleName = element.center.name + element.point2.name;
                        var pointNme = p[i].name;
                        document.getElementById("containsInfo").innerHTML = "Точка " + pointNme + " принадлежит окружности " + circleName;
                        break;
                    }
                }
            } else if(element instanceof  JXG.Point) {

                for(var i = 0; i < p.length; i++) {
                    if(p[i] instanceof  JXG.Circle) {
                        var circleName = p[i].center.name + p[i].point2.name;
                        var pointNme = element.name;
                        document.getElementById("containsInfo").innerHTML = "Точка " + pointNme + " принадлежит окружности " + circleName;
                        break;
                    } else if(p[i] instanceof  JXG.Line) {
                        var lineName = p[i].point1.name + p[i].point2.name;
                        var pointNme = element.name;
                        document.getElementById("containsInfo").innerHTML = "Точка " + pointNme + " принадлежит отрезку " + lineName;
                        break;
                    }
                }
            } else {
                document.getElementById("containsInfo").innerHTML = "";
            }
        }

    },

    getPolygon : function(side) {

        var polygon = null;
        for(var i = 0; i < this.polygons.length; i++) {
            if(this.polygons[i].containsSide(side)) {
                polygon = this.polygons[i];
                break;
            }
        }
        return polygon;
    },

    containsPoint : function(event) {

        var contains = false;
        var elements = this.board.getAllUnderMouse(event);

        if(elements.length >= 2) {
            contains = true;
        }
        return contains;
    },

    getExistingPoint : function(event) {

       var point = null;
       var elements = this.board.getAllUnderMouse(event);
       var element = elements[0];
       if(element instanceof JXG.Point) {
           point = new AbstractPoint([element.X(), element.Y()]);
           point.setContainsOnBoard(true);
       }
        return point;
    },


    getUsrCoordinatesOfMouse : function(event) {

        var pointInBoard = this.board.getUsrCoordsOfMouse(event);
        var result = [pointInBoard[0], pointInBoard[1]];
        return result;
    },

    createPoint : function(point) {

        var p = this.board.create('point', [point.getX(), point.getY()] /*, {attractors: this.points, attractorDistance:0.5, snatchDistance: 2}*/);
        this.points.push(p);

    },

    createPointWithoutPush : function(point) {
        var p = this.board.create('point', [point.getX(), point.getY()] /*, {attractors: this.points, attractorDistance:0.5, snatchDistance: 2}*/);
        return p;
    },

    deleteLastAddedPoint : function() {

        this.board.removeObject(this.points.pop());
    },

    getElement : function(event) {

        var p = this.board.getAllUnderMouse(event);
        var abstractElement = null;

        if(p.length > 1) {
            var element = p[0];
            abstractElement = this.searchElement(element)
        }

        return abstractElement;
    },

    getParam : function(point1,point2) {

        var param = null;

        for(var i = 0; i < this.elements.length; i++) {
            var element = this.elements[i];

            if(element instanceof  AbstractLine || element instanceof AbstractCircle) {
                if(((element.getPoint1() == point1 && element.getPoint2() == point2)
                    || (element.getPoint1() == point2 && element.getPoint2() == point1))) {
                    param = element.getParam();
                    break;
                }
            }
        }

        return param;
    },

    getPoint : function(abstractPoint) {

        var point = null;
        for(var i = 0, length = this.points.length; i < length; i++) {
            point = this.points[i];
            if(point.X() == abstractPoint.getX() && point.Y() == abstractPoint.getY()) {
                return point;
            }
        }
        return null;
    },

    createLine : function(abstractStartPoint, abstractEndPoint) {

        var startPoint = this.getPoint(abstractStartPoint);
        var endPoint = this.getPoint(abstractEndPoint)
        var line = this.board.create('line', [startPoint, endPoint]);
        var abstractLine = new AbstractLine(line, 0);
        this.elements.push(abstractLine);
        return abstractLine;
    },

    createDashedLine : function(abstractStartPoint, abstractEndPoint) {

        var startPoint = this.getPoint(abstractStartPoint);
        var endPoint = this.getPoint(abstractEndPoint)
        var line = this.board.create('line', [startPoint, endPoint],
            {straightFirst:false, straightLast:false, strokeWidth:2, dash:2});
        var abstractDashedLine = new AbstractDashedLine(line, 0);
        this.elements.push(abstractDashedLine);
        return abstractDashedLine;
    },

    createCircle : function(abstractStartPoint, abstractEndPoint) {

        var i, h, s, v;
        h = Math.random()*360;
        s = Math.random();
        v = 1.0;
        var startPoint = this.getPoint(abstractStartPoint);
        var endPoint = this.getPoint(abstractEndPoint)
        var circle = this.board.create('circle', [startPoint, endPoint],{fillColor:JXG.hsv2rgb((h+180)%360,s,v),fillOpacity:0.2});
        var param = this.getParam(startPoint, endPoint);
        param = (param == null) ?   Math.round(circle.getRadius()) : param;
        var abstractCircle = new AbstractCircle(circle,param);
        this.elements.push(abstractCircle);
        return abstractCircle;
    },

    createEllipse : function(abstractStartPoint, abstractEndPoint, abstractRetainerPoint){
        var startPoint = this.getPoint(abstractStartPoint);
        var endPoint = this.getPoint(abstractEndPoint);
        var retainerPoint = this.getPoint(abstractRetainerPoint);
        var ellipse  = this.board.create('ellipse', [startPoint, endPoint, retainerPoint])
       // fLength = (abstractEndPoint.get - abstractStartPoint)² + (abstractEndPoint - abstractStartPoint)²
      //  fLength = 15
       // param = (param == null) ? Math.round(fLength) : param
        var abstractEllipse = new AbstractEllipse(ellipse, 15);
        this.elements.push(abstractEllipse);
        return abstractEllipse;
        //todo
    },

    createSector : function(abstractPoint1, abstractPoint2, abstractPoint3) {

        var point1 = this.getPoint(abstractPoint1), point2 = this.getPoint(abstractPoint2),
            point3 =this.getPoint(abstractPoint3);
        var sector = this.board.create('sector', [point1, point2, point3]);
        var abstractSector = new AbstractSector(sector, 30);
        this.elements.push(abstractSector);
        return abstractSector;
    },

    createSemiCircle : function(abstractStartPoint, abstractEndPoint) {

        var startPoint = this.getPoint(abstractStartPoint);
        var endPoint = this.getPoint(abstractEndPoint)
        var semicircle = this.board.create('semicircle', [startPoint, endPoint]);
        var param = this.getParam(startPoint, endPoint);
        param = (param == null) ?   Math.round(semicircle.getRadius()) : param;
        var abstractSemiCircle = new AbstractSemiCircle(semicircle,param);
        this.elements.push(abstractSemiCircle);
        return abstractSemiCircle;
    },



    createSegment : function(abstractStartPoint, abstractEndPoint) {

        var startPoint = this.getPoint(abstractStartPoint);
        var endPoint = this.getPoint(abstractEndPoint);
        var line = this.board.create('line', [startPoint, endPoint],{straightFirst:false, straightLast:false});
        var param = this.getParam(startPoint, endPoint);
        param = (param == null) ?  Math.round(line.L())  : param;
        var abstractLine = new AbstractLine(line, param);
        this.elements.push(abstractLine);
        return abstractLine;
    },

    createTriangle : function(abstractPoint1, abstractPoint2, abstractPoint3) {

        var i, h, s, v;
        h = Math.random()*360;
        s = Math.random();
        v = 1.0;
        var point1 = this.getPoint(abstractPoint1), point2 = this.getPoint(abstractPoint2),
            point3 =this.getPoint(abstractPoint3);
        var triangle = this.board.create('polygon', [point1, point2, point3],{fillColor:JXG.hsv2rgb((h+180)%360,s,v),fillOpacity:0.2});
        var sideOfTheTriangle = triangle.borders;
        var side = this.createSideOfThePolygon(sideOfTheTriangle);
        var abstractTriangle = new AbstractPolygon(triangle, side);
        this.polygons.push(abstractTriangle);
        return abstractTriangle
    },

    createPolygon : function(abstractPoints) {

        var points = [];
        for(var  i = 0, length = abstractPoints.length; i < length; i++) {
            points.push(this.getPoint(abstractPoints[i]));
        }
        var polygon = this.board.create('polygon', points);
        var sideOfThePolygon = polygon.borders;
        var side = this.createSideOfThePolygon(sideOfThePolygon);
        var abstractPolygon = new AbstractPolygon(polygon, side);
        this.polygons.push(abstractPolygon);
        return abstractPolygon;

    },

    createAngle : function(abstractPoint1, abstractPoint2, abstractPoint3) {

        var point1 = this.getPoint(abstractPoint1), point2 = this.getPoint(abstractPoint2),
            point3 =this.getPoint(abstractPoint3);
        var angle = this.board.create('angle', [point1, point2, point3], {type:'sector', orthoType:'square', orthoSensitivity:2, radius: 5});
        var abstractAngle = new AbstractAngle(angle, 30);
        this.elements.push(abstractAngle);
        return abstractAngle;
    },

    createPolygonSide : function(startPoint, endPoint) {

        var side = this.board.create('line', [startPoint, endPoint],{straightFirst:false, straightLast:false});
        return side;
    },


    createSideOfThePolygon : function(side){

        var sideOfTheAbstractPolygon = [];
        for(var i = 0; i < side.length; i++) {
            var s = side[i];
            var param = this.getParam(s.point1, s.point2);
            param = (param == null) ?  Math.round(s.L())  : param;
            var abstractLine = new AbstractLine(s, param);
            this.elements.push(abstractLine);
            sideOfTheAbstractPolygon.push(abstractLine);
        }
        return sideOfTheAbstractPolygon;
    },

    removePoint : function(point) {

        this.deleteLastAddedPoint();
    },

    removeElement : function(abstractElement) {

      this.board.removeObject(abstractElement.getObject());
      this.removeAbstractElement(abstractElement);

    },

    removePolygon : function(abstractPolygon) {

        this.board.removeObject(abstractPolygon.getObject());
        this.polygons.splice(this.polygons.indexOf(abstractPolygon), 1);
    },

    searchElement : function(element) {

      var abstractElement = null;

        for(var i = 0; i < this.elements.length; i++) {
            var el = this.elements[i].getObject();
            if(el == element) {
                abstractElement = this.elements[i];
                break;
            }
        }
        return abstractElement;
    },

    saveChanges : function(abstractObject, param) {

        var point1 = abstractObject.getPoint1();
        var point2 = abstractObject.getPoint2();

        if(abstractObject instanceof  AbstractAngle) {
            abstractObject.setParam(param);
        } else {

            for(var i = 0; i < this.elements.length; i++) {
                var element = this.elements[i];

                if(element instanceof AbstractLine || element instanceof AbstractCircle) {

                    if((element.getPoint1() == point1 && element.getPoint2() == point2)
                        || (element.getPoint2() == point1 && element.getPoint1() == point2)) {
                        element.setParam(param);
                    }
                }
            }
        }
    },

    clear : function() {

        var zoomX = this.board.applyZoom().zoomX;
        var zoomY = this.board.applyZoom().zoomY;
        this.board = JXG.JSXGraph.initBoard('board', {boundingbox: [-20, 20, 20, -20], showCopyright : false, grid : this.showGrid,
            zoomX : zoomX, zoomY : zoomY });
        app.controller.clearPoints();
        app.clearHistory();
        this.elements.length = 0;
    },

    grid : function() {

        if(this.showGrid == true) {

            this.board.removeGrids();
            this.showGrid = false;
        }  else {
            this.board.create('grid', []);
            this.showGrid = true;
        }

    },

    removeAbstractElement : function(element) {

        this.elements.splice(this.elements.indexOf(element), 1);
    }
}

