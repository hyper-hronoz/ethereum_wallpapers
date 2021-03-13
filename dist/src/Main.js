// initialize app
export default class Main {
    // constructor
    constructor() {
        // assign DOM_Elements
        this.canvas = document.querySelector("#canvas");
        this.ctx = this.canvas.getContext("2d");
        // assign properties
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        this.lineColor = "rgb(0,211,255)";
        this.gridColor = "rgba(255,255,255,0.04)";
        this.gridThickness = "1px";
        this.shadowColor = "#00D3FF";
        this.shadowProperties = "0px 0px 16px";
        // this.backgroundColor = "#111E2E";
        this.backgroundColor = "rgb(17,30,46)";
        this.backgroundChartColor = "rgb(0,211,255, 0.04)";
        this.lineShadow = {
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 16,
            shadowColor: "#00D3FF"
        };
        this.currensyId = "ripple";
        this.vsCurrensy = "usd";
        this.from = 1412577232;
        this.to = 1422577232;
    }
}
