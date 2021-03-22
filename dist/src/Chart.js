import Core from "./Core.js";
import ChartDrawer from "./ChartDrawer.js";
import Scale from "./Scale.js";
class Chart {
    constructor(ctx, data) {
        const core = new Core(ctx, data);
        const chartDrawer = new ChartDrawer(ctx, data);
        const scale = new Scale();
    }
}
export default Chart;
