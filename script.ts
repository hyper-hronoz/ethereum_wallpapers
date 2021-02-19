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

     // query parameters
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
          this.lineColor = "#00D3FF";
          this.gridColor = "rgba(255,255,255,0.04)";
          this.gridThickness = "1px";
          this.shadowColor = "#00D3FF";
          this.shadowProperties = "0px 0px 16px";
          // this.backgroundColor = "#111E2E";
          this.backgroundColor = "rgb(17,30,46)";
          this.vsCurrensy = "usd";
          this.from = 1613422800;
          this.to = 1613672582;

     }

     async startApplication() {
          const drawCanvas = await new DrawCanvas();
          const chartData = await new Transformdata().transform();
          const drawGrid = await new DrawGrid(chartData).draw();
          // const drawGrid = new DrawGrid(this.vsCurrensy, this.from, this.to);

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


interface DrawGrid {
     vsCurrensy: string, // usd | eur | rub
     from: number, // period of time (start)
     to: number, // period of time (end)
     draw(): void, // draw grid
}

type ChartDataItem = {
     timestamp: string,
     value: number
}

type ChartData = {
     [key: number]: ChartDataItem;
}

// transforming http response
class Transformdata extends Main {
     constructor() {
          super();
     }

     async transform(): Promise<ChartData> {

          const query: HTTP = new HTTP(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${this.from}&to=${this.to}`);
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

          console.log(chartData);
          
          return chartData;
     }
     
}

// create grid 
class DrawGrid extends Main implements DrawGrid {
     private chartData: ChartData;
     constructor (chartData: ChartData) {
          super()
          this.chartData = chartData;
     }

     draw(): void {
          console.log(this.chartData);
          const timestampMargin: number = this.canvasWidth / Object.keys(this.chartData).length
          const chartDataLength: number = Object.keys(this.chartData).length;
          for (let i = 0; i < chartDataLength; i++) {
               this.ctx.beginPath();
               this.ctx.moveTo(i * timestampMargin, 0);   
               this.ctx.lineTo(i * timestampMargin, this.canvasHeight);  
               this.ctx.strokeStyle = this.gridColor;
               this.ctx.lineWidth = this.gridThickness;
               this.ctx.fillText(this.chartData[i].timestamp, i * timestampMargin, this.canvasHeight - 30);
               this.ctx.stroke();       
          }
     }
}

class DrawChart extends Main {
     constructor() {
          super();

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
          console.log(this.options);
          const response = await fetch(this.url, this.options);
          const data = await response.json();
          return data;
     }
}

new Main().startApplication();