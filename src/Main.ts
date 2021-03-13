// initialize app
export default class Main {
     // initialize DOM_Elements
     protected canvas: any;
     protected ctx: any;

     // initialize properties
     protected readonly backgroundColor: string;
     protected readonly lineColor: string;
     protected readonly shadowColor: string;
     protected readonly shadowProperties: string;
     protected readonly canvasWidth: number;
     protected readonly canvasHeight: number;
     protected readonly gridColor: string;
     protected readonly gridThickness: string;
     protected readonly backgroundChartColor: string;
     protected readonly lineShadow: any;

     // query parameters
     protected readonly currensyId: string;
     protected readonly vsCurrensy: string;
     protected readonly from: number;
     protected readonly to: number;

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
          }

          this.currensyId = "ripple";
          this.vsCurrensy = "usd";
          this.from = 1412577232;
          this.to = 1422577232;
     }
}