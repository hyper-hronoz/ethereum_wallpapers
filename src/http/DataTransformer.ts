type ChartDataItem = { timestamp: string, value: number, }

type ChartData = { [key: number]: ChartDataItem, }


// transforming http response
export default class TransformData {

    private data: any;

     constructor(data: object) {
         this.data = data;
     }

     transform(): ChartData {

        console.log("Chart Data", this.data);
        
          const chartData: ChartData = {};
          const prices: Array<Array<number>>  = this.data.prices;

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