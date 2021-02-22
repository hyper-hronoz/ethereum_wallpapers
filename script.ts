// initialize app
class Main {
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
          this.canvasWidth = window.screen.width;
          this.canvasHeight = window.screen.height;
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
          this.from = 1392577232;
          this.to = 1422577232;

     }

     async startApplication() {
          const drawCanvas = await new DrawCanvas();
          const chartData = await new TransformData().transform();
          // console.log(chartData);
          const chart = await new Chart(chartData).draw();
     }
}

// draw canvas
class DrawCanvas extends Main {
     constructor () {
          super();
          this.canvas.width = this.canvasWidth;
          this.canvas.height = this.canvasHeight;
          this.canvas.style.backgroundColor = this.backgroundColor;
          this.canvas.style.position = "absolute";
          this.canvas.style.top = 0;
          this.canvas.style.left = 0;
     }
}

type ChartDataItem = {
     timestamp: string,
     value: number
}

type ChartData = {
     [key: number]: ChartDataItem;
}

// transforming http response
class TransformData extends Main {
     constructor() {
          super();
     }

     async transform(): Promise<ChartData> {

          const query: HTTP = new HTTP(`https://api.coingecko.com/api/v3/coins/${this.currensyId}/market_chart/range?vs_currency=${this.vsCurrensy}&from=${this.from}&to=${this.to}`);
          const data: any = await query.send();

          const chartData: ChartData = {};
          const prices: Array<Array<number>>  = data.prices;

          const pricesLength: number = prices.length;

          for (let i = 0; i < pricesLength; i++) {
               const timestamp = new Date(prices[i][0]).getHours().toString();

               const chartDataItem: ChartDataItem = {
                    timestamp: timestamp,
                    value: prices[i][1],
               }

               chartData[i] = chartDataItem;
          }

          return chartData;
     }
     
}

interface Chart {
     chartData: ChartData,
     draw(): void
}

// drawing chart
class Chart extends Main implements Chart  {
     protected timestampMargin: number;
     protected valueMargin: number;
     protected chartDataLength: number;
     protected maximalValue: number;
     protected minimalValue: number;

     chartData: ChartData;

     constructor (chartData: ChartData) {
          super()
          this.chartData = chartData;
          this.timestampMargin = this.canvasWidth / Object.keys(this.chartData).length
          this.valueMargin = this.canvasHeight / Object.keys(this.chartData).length;
          this.chartDataLength = Object.keys(this.chartData).length;
          this.minimalValue = 999999999999999999999999999999999999999999999999999999999999;
          this.maximalValue = 0

          for (let i = 0; i < this.chartDataLength; i++) {
               if (this.chartData[i].value > this.maximalValue) {
                    this.maximalValue = this.chartData[i].value;
               }
               if (this.chartData[i].value < this.minimalValue) {
                    this.minimalValue = this.chartData[i].value;
               }
          }
     }

     draw(): void {
          console.log(this.valueMargin);
          const grid = new Grid(this.chartData, this.vsCurrensy, this.from, this.to);
          grid.draw();
          const graph = new Graph(this.chartData);
          graph.draw();
          const cursor = new Cursor(this.chartData).watch();
     }
}

interface DrawGrid {
     vsCurrensy: string, // usd | eur | rub
     from: number, // period of time (start)
     to: number, // period of time (end)
}

// drawing grid in chart
class Grid extends Chart implements DrawGrid {
     public vsCurrensy: string;
     public from: number;
     public to: number;

     constructor(chartData: ChartData, vsCurrensy: string, from: number, to: number) {
          super(chartData);
          this.vsCurrensy = vsCurrensy;
          this.from = from;
          this.to = to;
     }

     draw(): void {

          console.log(`minimal value: ${this.minimalValue}; maximal value: ${this.maximalValue}`);
          

          // for (let i = 0; i < this.chartDataLength; i++) {


          //      // vertival
          //      this.ctx.beginPath();
          //      this.ctx.moveTo(i * this.timestampMargin, 0);   
          //      this.ctx.lineTo(i * this.timestampMargin, this.canvasHeight);  
          //      this.ctx.strokeStyle = this.gridColor;
          //      this.ctx.lineWidth = this.gridThickness;
          //      this.ctx.fillText(this.chartData[i].timestamp, i * this.timestampMargin, this.canvasHeight - 30);
          //      this.ctx.stroke();       

          //      // horizontal
          //      this.ctx.beginPath();
          //      this.ctx.moveTo(0, this.valueMargin * i);   
          //      this.ctx.lineTo(this.canvasWidth, this.valueMargin * i);  
          //      this.ctx.strokeStyle = this.gridColor;
          //      this.ctx.lineWidth = this.gridThickness;
          //      this.ctx.fillText(this.chartData[i].value, 20 , i * this.valueMargin);
          //      this.ctx.stroke();       
          // }
     }
}

type Coordinate = {
     x: number,
     y: number
}

type Coordinates = {
     0: Coordinate,
     1: Coordinate
}

// drawing line chart
class Graph extends Chart {

     chartData: ChartData;

     constructor(chartData: ChartData) {
          super(chartData);
          this.chartData = chartData;
     }

     draw(): void {
          for (let i = 0; i < this.chartDataLength; i++) {
               this.ctx.beginPath();

               if (i == 0) {
                    continue;
               }

               const coordinate_1: Coordinate = {
                    x: i * this.timestampMargin,
                    y: this.canvasHeight - (this.chartData[i].value) / (this.maximalValue) * (this.canvasHeight),
               }

               const coordinate_2: Coordinate = {
                    x: (i - 1) * this.timestampMargin,
                    y: this.canvasHeight - (this.chartData[i - 1].value) / (this.maximalValue) * (this.canvasHeight),
               }

               const coordinates: Coordinates = {
                    0: coordinate_1,
                    1: coordinate_2
               }

               console.log((this.chartData[i].value) / (this.maximalValue));
               

               // lines 
               this.ctx.shadowBlur = this.lineShadow.shadowBlur;;
               this.ctx.shadowOffsetX = this.lineShadow.shadowOffsetX;
               this.ctx.shadowOffsetY = this.lineShadow.shadowOffsetY;
               this.ctx.shadowColor = this.lineShadow.shadowColor;
               this.ctx.moveTo(coordinates[0].x, coordinates[0].y);
               this.ctx.lineWidth = 1.4;
               this.ctx.translate(0, 0);
               this.ctx.lineCap = "round";
               this.ctx.lineTo(coordinates[1].x, coordinates[1].y);
               this.ctx.strokeStyle = this.lineColor;
               this.ctx.stroke();

               // background
               this.drawBackGround(coordinates);
          }
     }

     // dtaw background in chart
     private drawBackGround(coordinates: Coordinates): void {
          this.ctx.beginPath();
          this.ctx.moveTo(coordinates[0].x, coordinates[0].y);
          this.ctx.lineTo(coordinates[1].x, coordinates[1].y);
          this.ctx.lineTo(coordinates[1].x, this.canvasHeight);
          this.ctx.lineTo(coordinates[0].x, this.canvasHeight);
          this.ctx.lineTo(coordinates[0].x, coordinates[0].y);
          this.ctx.fillStyle = this.backgroundChartColor;
          this.ctx.fill();
     }
}

interface Cursor {
     positionX: number
     positionY: number,
}

class Cursor extends Chart implements Cursor {
     public positionX: number;
     public positionY: number;
     public chartData: ChartData;
     
     constructor(chartData: ChartData) {
          super(chartData);
          this.chartData = chartData;
          this.positionX = -200;
          this.positionY = -200;
     }

     watch(): void {
          this.canvas.addEventListener("mousemove", (event: any) => {
               this.positionX = event.offsetX;
               this.positionY = event.offsetY;
               // console.log(this.positionX);
               // console.log(this.positionY);
          })
     }
}

interface HTTP {
     url: string,
     method: string,
     data: any,
}

interface Options {
     [key: string]: any,
}

// http request to API coigeeko
class HTTP implements HTTP {
     private options: Options = {

     }

     constructor (url: string, method: string = "GET", data = "") {
         this.url = url;
         this.options.method = method;

         if (this.data != "" && method != "GET") {
               this.options.headers = {
                    'Content-Type': 'application/json;charset=utf-8'
               },
               this.options.data = data.toString();
         }
     }

     async send(): Promise<object> {
          // console.log(this.options);
          const response = await fetch(this.url, this.options);
          const data = await response.json();
          return data;
     }
}

new Main().startApplication();