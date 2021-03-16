// transforming http response
export default class TransformData {
    constructor(data) {
        this.data = data;
    }
    transform() {
        console.log("Chart Data", this.data);
        const chartData = {};
        const prices = this.data.prices;
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
    }
}
