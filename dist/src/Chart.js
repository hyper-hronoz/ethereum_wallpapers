import Core from "./Core.js";
import ChartDrawer from "./ChartDrawer.js";
class Chart {
    constructor(ctx, data) {
        const core = new Core(ctx, data);
        const chartDrawer = new ChartDrawer(ctx, data);
    }
}
export default Chart;
