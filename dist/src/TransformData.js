var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Main from "./Main.js";
import Http from "./Http.js";
// transforming http response
class TransformData extends Main {
    constructor() {
        super();
    }
    transform() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new Http(`https://api.coingecko.com/api/v3/coins/${this.currensyId}/market_chart/range?vs_currency=${this.vsCurrensy}&from=${this.from}&to=${this.to}`);
            const data = yield query.send();
            const chartData = {};
            const prices = data.prices;
            const pricesLength = prices.length;
            for (let i = 0; i < pricesLength; i++) {
                const timestamp = new Date(prices[i][0]).getHours().toString();
                const chartDataItem = {
                    timestamp: timestamp,
                    value: prices[i][1],
                };
                chartData[i] = chartDataItem;
            }
            return chartData;
        });
    }
}
