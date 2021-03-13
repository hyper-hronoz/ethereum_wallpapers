import Main from "./Main.js";

interface ChartDataItem  {
     timestamp: string,
     value: number
}

interface ChartData  {
     [key: number]: ChartDataItem;
}

class Chart extends Main implements Chart  {
     protected timestampMargin: number;
     protected valueMargin: number;
     protected chartDataLength: number;
     protected maximalValue: number;
     protected minimalValue: number;
     protected values: Array<number>;

     chartData: ChartData;

     constructor (chartData: ChartData) {
          super()
          this.chartData = chartData;
          this.timestampMargin = this.canvasWidth / Object.keys(this.chartData).length
          this.valueMargin = this.canvasHeight / Object.keys(this.chartData).length;
          this.chartDataLength = Object.keys(this.chartData).length;
          this.minimalValue = 999999999999999999999999999999999999999999999999999999999999;
          this.maximalValue = 0;
          this.values = [];

          for (let i = 0; i < this.chartDataLength; i++) {
               if (this.chartData[i].value > this.maximalValue) {
                    this.maximalValue = this.chartData[i].value;
               }
               if (this.chartData[i].value < this.minimalValue) {
                    this.minimalValue = this.chartData[i].value;
               }
          }
     }
}