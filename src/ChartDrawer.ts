import Core from "./Core.js";
import ChartData from "./interfaces/ChartDataInterface.js";


type Coordinate = {
     x: number,
     y: number
}

type Coordinates = {
     [key: number]: Coordinate
}


class ChartDrawer extends Core { 
     public backgroundChartColor: string;
     public backgroundColor: string;
     public lineColor: string;
     public shadowColor: string;
     public shadowProperties: string;
     public gridThickness: string;

     constructor(ctx: any, chartData: ChartData) {
          super(ctx, chartData);

          this.shadowColor = "#00D3FF";
          this.shadowProperties = "0px 0px 16px";
          this.backgroundColor = "rgb(17,30,46)";
          this.backgroundChartColor = "rgb(0,211,255, 0.04)";
          this.lineColor = "rgb(0,211,255)";
          this.gridThickness = "1px";
          this.lineShadow = {
               shadowOffsetX: 0,
               shadowOffsetY: 0,
               shadowBlur: 16,
               shadowColor: "#00D3FF"
          }

          this.draw();
     } 

     draw(): void {

          for (let i = 1; i < this.chartDataLength; i++) {
               this.ctx.beginPath();

               const coordinate_1: Coordinate = {
                    x: i * this.timestampMargin,
                    y: this.ctx.canvas.height - (this.chartData[i].value  / this.maximalValue * this.ctx.canvas.height - this.minimalValue / this.maximalValue * this.ctx.canvas.height) * 1.2
               }

               const coordinate_2: Coordinate = {
                    x: (i - 1) * this.timestampMargin,
                    y: this.ctx.canvas.height - (this.chartData[i - 1].value  / this.maximalValue * this.ctx.canvas.height - this.minimalValue / this.maximalValue * this.ctx.canvas.height) * 1.2
               }

               console.log(((this.minimalValue / this.maximalValue)));
               

               const coordinates: Coordinates = {
                    0: coordinate_1,
                    1: coordinate_2
               }

               console.log("Coordinates", coordinates);
               console.log("works");

               // lines 
               this.ctx.moveTo(coordinates[0].x, coordinates[0].y);
               this.ctx.lineWidth = 1.4;
               this.ctx.translate(0, 0);
               this.ctx.lineCap = "round";
               this.ctx.lineTo(coordinates[1].x, coordinates[1].y);
               this.ctx.strokeStyle = this.lineColor;
               this.ctx.closePath();
               this.ctx.stroke();
          }

          // this.drawBackGround();
     }

     // background
     private drawBackGround(): void {
          this.ctx.beginPath();
          const coordinate_1: Coordinate = {
               x: 0,
               y: this.ctx.canvas.height - (this.chartData[1].value) / (this.maximalValue) * (this.ctx.canvas.height),
          }
          // this.ctx.moveTo(coordinate_1.x, coordinate_1.y);
          this.ctx.lineTo(coordinate_1.x, coordinate_1.y)
          for (let i = 1; i < this.chartDataLength; i++) {

               const coordinate_2: Coordinate = {
                    x: (i - 1) * this.timestampMargin,
                    y: this.ctx.canvas.height - (this.chartData[i - 1].value) / (this.maximalValue) * (this.ctx.canvas.height),
               }

               // lines 
               this.ctx.lineTo(coordinate_2.x, coordinate_2.y);
          }
          this.ctx.lineTo((this.chartDataLength - 1) * this.timestampMargin, this.ctx.canvas.height - (this.chartData[this.chartDataLength - 1].value) / (this.maximalValue) * (this.ctx.canvas.height));
          this.ctx.lineTo((this.chartDataLength - 1) * this.timestampMargin, this.ctx.canvas.height);
          this.ctx.lineTo(0, this.ctx.canvas.height);
          this.ctx.fillStyle = this.backgroundChartColor;
          this.ctx.fill();
     }
}

export default ChartDrawer;