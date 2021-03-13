import DrawCanvas from "./src/DrawCanvas.js";
new DrawCanvas();
// const startApplication = async (): Promise<void> => {
//      const drawCanvas = await new DrawCanvas();
//      const chartData = await new TransformData().transform();
//      // console.log(chartData);
//      const chart = await new Chart(chartData).draw();
// }
// const main = new Main();
// type ChartDataItem = {
//      timestamp: string,
//      value: number
// }
// type ChartData = {
//      [key: number]: ChartDataItem;
// }
// interface Chart {
//      chartData: ChartData,
//      draw(): void
// }
// // drawing chart
// class Chart extends Main implements Chart  {
//      protected timestampMargin: number;
//      protected valueMargin: number;
//      protected chartDataLength: number;
//      protected maximalValue: number;
//      protected minimalValue: number;
//      protected values: Array<number>;
//      chartData: ChartData;
//      constructor (chartData: ChartData) {
//           super()
//           this.chartData = chartData;
//           this.timestampMargin = this.canvasWidth / Object.keys(this.chartData).length
//           this.valueMargin = this.canvasHeight / Object.keys(this.chartData).length;
//           this.chartDataLength = Object.keys(this.chartData).length;
//           this.minimalValue = 999999999999999999999999999999999999999999999999999999999999;
//           this.maximalValue = 0;
//           this.values = [];
//           for (let i = 0; i < this.chartDataLength; i++) {
//                if (this.chartData[i].value > this.maximalValue) {
//                     this.maximalValue = this.chartData[i].value;
//                }
//                if (this.chartData[i].value < this.minimalValue) {
//                     this.minimalValue = this.chartData[i].value;
//                }
//           }
//      }
//      draw(): void {
//           console.log(this.valueMargin);
//           const grid = new Grid(this.chartData, this.vsCurrensy, this.from, this.to);
//           grid.draw();
//           const graph = new Graph(this.chartData);
//           graph.draw();
//           const cursor = new Cursor(this.chartData).watch();
//      }
// }
// interface DrawGrid {
//      vsCurrensy: string, // usd | eur | rub
//      from: number, // period of time (start)
//      to: number, // period of time (end)
// }
// // drawing grid in chart
// class Grid extends Chart implements DrawGrid {
//      public vsCurrensy: string;
//      public from: number;
//      public to: number;
//      constructor(chartData: ChartData, vsCurrensy: string, from: number, to: number) {
//           super(chartData);
//           this.vsCurrensy = vsCurrensy;
//           this.from = from;
//           this.to = to;
//      }
//      draw(): void {
//           console.log(`minimal value: ${this.minimalValue}; maximal value: ${this.maximalValue}`);
//           this.ctx.beginPath();
//           this.ctx.moveTo(0, this.canvasHeight - (this.minimalValue) / (this.maximalValue) * (this.canvasHeight ));
//           this.ctx.lineTo(this.canvasWidth, this.canvasHeight - (this.minimalValue) / (this.maximalValue) * (this.canvasHeight ));
//           this.ctx.strokeStyle = this.gridColor;
//           this.ctx.fillText(this.minimalValue, 10, this.canvasHeight - (this.minimalValue) / (this.maximalValue) * (this.canvasHeight ));
//           this.ctx.stroke();
//           this.ctx.beginPath();
//           this.ctx.moveTo(0, this.canvasHeight - (this.maximalValue) / (this.maximalValue) * (this.canvasHeight ));
//           this.ctx.lineTo(this.canvasWidth, this.canvasHeight - (this.maximalValue) / (this.maximalValue) * (this.canvasHeight ));
//           this.ctx.strokeStyle = this.gridColor;
//           // this.ctx.fillText(this.maximalValue, 10, this.canvasHeight - (this.maximalValue) / (this.maximalValue) * (this.canvasHeight - (this.minimalValue / this.maximalValue * this.canvasHeight)));
//           this.ctx.fillText(this.maximalValue, 10, this.canvasHeight - (this.maximalValue) / (this.maximalValue) * (this.canvasHeight));
//           this.ctx.stroke();
//      }
// }
// type Coordinate = {
//      x: number,
//      y: number
// }
// type Coordinates = {
//      0: Coordinate,
//      1: Coordinate
// }
// // drawing line chart
// class Graph extends Chart {
//      chartData: ChartData;
//      constructor(chartData: ChartData) {
//           super(chartData);
//           this.chartData = chartData;
//           this.drawBackGround();
//      }
//      draw(): void {
//                this.ctx.shadowBlur = this.lineShadow.shadowBlur;
//                this.ctx.shadowOffsetX = this.lineShadow.shadowOffsetX;
//                this.ctx.shadowOffsetY = this.lineShadow.shadowOffsetY;
//                this.ctx.shadowColor = this.lineShadow.shadowColor;
//           for (let i = 1; i < this.chartDataLength; i++) {
//                this.ctx.beginPath();
//                const coordinate_1: Coordinate = {
//                     x: i * this.timestampMargin,
//                     y: this.canvasHeight - (this.chartData[i].value) / (this.maximalValue) * (this.canvasHeight) ,
//                }
//                const coordinate_2: Coordinate = {
//                     x: (i - 1) * this.timestampMargin,
//                     y: this.canvasHeight - (this.chartData[i - 1].value) / (this.maximalValue) * (this.canvasHeight),
//                }
//                const coordinates: Coordinates = {
//                     0: coordinate_1,
//                     1: coordinate_2
//                }
//                // lines 
//                this.ctx.moveTo(coordinates[0].x, coordinates[0].y);
//                this.ctx.lineWidth = 1.4;
//                this.ctx.translate(0, 0);
//                this.ctx.lineCap = "round";
//                this.ctx.lineTo(coordinates[1].x, coordinates[1].y);
//                this.ctx.strokeStyle = this.lineColor;
//                this.ctx.closePath(); 
//                this.ctx.stroke();
//           }
//      }
//      // background
//      private drawBackGround(): void {
//           this.ctx.beginPath();
//           const coordinate_1: Coordinate = {
//                x: 0,
//                y: this.canvasHeight - (this.chartData[1].value) / (this.maximalValue) * (this.canvasHeight),
//           }
//           // this.ctx.moveTo(coordinate_1.x, coordinate_1.y);
//           this.ctx.lineTo(coordinate_1.x, coordinate_1.y)
//           for (let i = 1; i < this.chartDataLength; i++) {
//                const coordinate_2: Coordinate = {
//                     x: (i - 1) * this.timestampMargin,
//                     y: this.canvasHeight - (this.chartData[i - 1].value) / (this.maximalValue) * (this.canvasHeight),
//                }
//                // lines 
//                this.ctx.lineTo(coordinate_2.x, coordinate_2.y);
//           }
//           this.ctx.lineTo((this.chartDataLength - 1) * this.timestampMargin, this.canvasHeight - (this.chartData[this.chartDataLength - 1].value) / (this.maximalValue) * (this.canvasHeight));
//           this.ctx.lineTo((this.chartDataLength - 1) * this.timestampMargin, this.canvasHeight);
//           this.ctx.lineTo(0, this.canvasHeight); 
//           this.ctx.fillStyle = this.backgroundChartColor;
//           this.ctx.fill();
//      }
// }
// interface Cursor {
//      positionX: number
//      positionY: number,
// }
// class Cursor extends Chart implements Cursor {
//      public positionX: number;
//      public positionY: number;
//      public chartData: ChartData;
//      constructor(chartData: ChartData) {
//           super(chartData);
//           this.chartData = chartData;
//           this.positionX = -200;
//           this.positionY = -200;
//      }
//      watch(): void {
//           this.canvas.addEventListener("mousemove", (event: any) => {
//                this.positionX = event.offsetX;
//                this.positionY = event.offsetY;
//                // console.log(this.positionX);
//                // console.log(this.positionY);
//           })
//      }
// }
// // http request to API coigeeko
