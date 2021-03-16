class Core {
    constructor(context, chartData) {
        this.ctx = context;
        this.gridColor = "rgba(255,255,255,0.04)";
        this.chartData = chartData;
        this.timestampMargin = this.ctx.canvas.width / Object.keys(this.chartData).length;
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
export default Core;
