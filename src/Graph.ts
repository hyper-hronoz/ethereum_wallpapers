import Chart from "./Chart";

class Graph extends Chart {

     chartData: ChartData;

     constructor(chartData: ChartData) {
          super(chartData);
          this.chartData = chartData;
          this.drawBackGround();
     }

     draw(): void {

               this.ctx.shadowBlur = this.lineShadow.shadowBlur;
               this.ctx.shadowOffsetX = this.lineShadow.shadowOffsetX;
               this.ctx.shadowOffsetY = this.lineShadow.shadowOffsetY;
               this.ctx.shadowColor = this.lineShadow.shadowColor;
          for (let i = 1; i < this.chartDataLength; i++) {
               this.ctx.beginPath();

               const coordinate_1: Coordinate = {
                    x: i * this.timestampMargin,
                    y: this.canvasHeight - (this.chartData[i].value) / (this.maximalValue) * (this.canvasHeight) ,
               }

               const coordinate_2: Coordinate = {
                    x: (i - 1) * this.timestampMargin,
                    y: this.canvasHeight - (this.chartData[i - 1].value) / (this.maximalValue) * (this.canvasHeight),
               }

               const coordinates: Coordinates = {
                    0: coordinate_1,
                    1: coordinate_2
               }

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
     }

     // background
     private drawBackGround(): void {
          this.ctx.beginPath();
          const coordinate_1: Coordinate = {
               x: 0,
               y: this.canvasHeight - (this.chartData[1].value) / (this.maximalValue) * (this.canvasHeight),
          }
          // this.ctx.moveTo(coordinate_1.x, coordinate_1.y);
          this.ctx.lineTo(coordinate_1.x, coordinate_1.y)
          for (let i = 1; i < this.chartDataLength; i++) {

               const coordinate_2: Coordinate = {
                    x: (i - 1) * this.timestampMargin,
                    y: this.canvasHeight - (this.chartData[i - 1].value) / (this.maximalValue) * (this.canvasHeight),
               }

               // lines 
               this.ctx.lineTo(coordinate_2.x, coordinate_2.y);
          }
          this.ctx.lineTo((this.chartDataLength - 1) * this.timestampMargin, this.canvasHeight - (this.chartData[this.chartDataLength - 1].value) / (this.maximalValue) * (this.canvasHeight));
          this.ctx.lineTo((this.chartDataLength - 1) * this.timestampMargin, this.canvasHeight);
          this.ctx.lineTo(0, this.canvasHeight); 
          this.ctx.fillStyle = this.backgroundChartColor;
          this.ctx.fill();
     }
}