import Core from "./Core.js";
import ChartDrawer from "./ChartDrawer.js";
import ChartData from "./interfaces/ChartDataInterface.js";
import Scale  from "./Scale.js";

class Chart implements Chart {
     constructor(ctx: any, data: ChartData) {

          const core = new Core(ctx, data);
          const chartDrawer = new ChartDrawer(ctx, data);
          const scale = new Scale();
     }
}

export default Chart;