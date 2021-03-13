import Main from "./Main.js";
import Http from "./Http.js";


type ChartDataItem = { timestamp: string, value: number, }

type ChartData = { [key: number]: ChartDataItem, }


// transforming http response
class TransformData extends Main {
     constructor() {
          super();
     }

     async transform(): Promise<ChartData> {
          const query: Http = new Http(`https://api.coingecko.com/api/v3/coins/${this.currensyId}/market_chart/range?vs_currency=${this.vsCurrensy}&from=${this.from}&to=${this.to}`);
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