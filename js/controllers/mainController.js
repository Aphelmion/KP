/**
 * Created by Администратор on 07.12.13.
 */

var app = {

    controller : null,
    drawer : null,
    parametersDoc : null,
    changeElement : null,
    history : [],
    index : 0,

    setLineMode : function() {

        this.clearCtrlPoints();
        this.controller = LineCtrl;
        document.getElementById("modeInfo").innerHTML = "Рисование линий";
    },

    setDashedLineMode : function() {

        this.clearCtrlPoints();
        this.controller = DashedLineCtrl;
        document.getElementById("modeInfo").innerHTML = "Рисование прерывистых линий";
    },

    setCircleMode : function() {
        this.clearCtrlPoints();
        this.controller = CircleCtrl;
        document.getElementById("modeInfo").innerHTML = "Рисование окружностей";
    },

    setSemiCircleMode : function() {
        this.clearCtrlPoints();
        this.controller = SemiCircleCtrl;
        document.getElementById("modeInfo").innerHTML = "Рисование полуокружностей";
    },

    setSectorMode : function() {

        this.clearCtrlPoints();
        this.controller = SectorCtrl;
        document.getElementById("modeInfo").innerHTML = "Рисование секторов";
    },

    setSegmentMode : function() {

        this.clearCtrlPoints();
        this.controller = SegmentCtrl;
        document.getElementById("modeInfo").innerHTML = "Рисование отрезков";
    },

    setTriangleMode : function() {

        this.clearCtrlPoints();
        this.controller = TriangleCtrl;
        document.getElementById("modeInfo").innerHTML = "Рисование треугольников";
    },

    setEllipseMode : function() {

        this.clearCtrlPoints();
        this.controller = EllipseCtrl;
        document.getElementById("modeInfo").innerHTML = "Рисование эллипсов";
    },


    setPolygonMode : function() {

        this.clearCtrlPoints();
        this.controller = PolygonCtrl;
        document.getElementById("modeInfo").innerHTML = "Рисование N-угольников";
    },

    setAngleMode : function() {

        this.clearCtrlPoints();
        this.controller = AngleCtrl;
        document.getElementById("modeInfo").innerHTML = "Рисование углов";
    },


    setPointMode : function() {

        this.clearCtrlPoints();
        this.controller = PointCtrl;
        document.getElementById("modeInfo").innerHTML = "Рисование точек";
    },

    setParametersDoc: function (doc) {
        this.parametersDoc = doc;
    },

    saveChanges : function() {

        var param = document.getElementById("p").value;
        PaintPanel.saveChanges(this.changeElement, param);
        this.changeElement = null;
        this.closeField();

    },

    closeField : function() {
        var field = document.getElementById("parameters");
        field.style.display = 'none';
    },

    clearCtrlPoints : function() {

        if(this.controller != null) {
            this.controller.clearPoints();
        }
    },

    executeCommand : function(command) {

        command.execute();
        if(this.index < this.history.length) {
            this.history.length = this.index;
        }
        this.history.push(command);
        this.index++;
    },

    undo : function() {

        if(this.index > -1) {
            this.history[--this.index].unExecute();
        } else {
            this.controller.clearPoints();
        }
    },

    redo : function() {
        if(this.index < this.history.length) {
            this.history[this.index++].execute();
        }
    },

    clearHistory : function() {
        if (this.history.length != 0){
            this.history.length = 0;
            this.index = 0;
        }
    }
}

    document.addEventListener("DOMContentLoaded", function () {

        var board = document.getElementById("board");
        app.setPointMode();

        board.addEventListener("mousedown", function (event) {
            var LEFT_MOUSE_BUTTON = 1;
            var RIGHT_MOUSE_BUTTON = 3;
            app.closeField();

            switch (event.which) {
                case LEFT_MOUSE_BUTTON:
                    app.controller.addPoint(event);
            }

            if(event.ctrlKey && event.which == RIGHT_MOUSE_BUTTON) {

                app.changeElement = PaintPanel.getElement(event);
                if(app.changeElement != null) {
                    var field = document.getElementById("parameters");
                    field.style.display = 'block';
                    document.getElementById("p").focus();
                }
            }
        });

        board.addEventListener("mousemove", function (event) {

            PaintPanel.showElementInfo(event);
            PaintPanel.showContainsInfo(event);


        });

        board.addEventListener("mouseup", function (event) {
            var LEFT_MOUSE_BUTTON = 1;
            switch (event.which){
                case LEFT_MOUSE_BUTTON:
                    app.controller.movePoint(event);
            }
        });

        document.addEventListener("keydown", function (event) {
            var keyZ = 90, keyY = 89;
            var keyC = 67, keyG = 71;
            var keyF1 = 112;

            if(event.ctrlKey && event.keyCode == keyZ) {
                app.undo();
            } else if(event.ctrlKey && event.keyCode == keyY){
                app.redo();
            }

            if(event.shiftKey && event.keyCode == keyC) {
                PaintPanel.clear();
            } else if(event.shiftKey && event.keyCode == keyG){
                PaintPanel.grid();
            }

            if(event.keyCode == keyF1){
                var newWin = window.open('help.html');
            }
        });
});