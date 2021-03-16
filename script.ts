// import Chart from "./src/Chart.js";
import HTTP from "./src/http/Http.js";
import DataTransformer from  "./src/http/DataTransformer.js";
import Chart from "./src/Chart.js";


const currensyId: string = "ripple";
const vsCurrensy: string = "usd";
const from: number = 1412577232;
const to: number = 1422577232;
const canvas = document.querySelector("#canvas") as  HTMLCanvasElement;
let ctx = canvas!.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = "#111E2E";

const body = document.querySelector("body");
body!.style.margin = 0 + "px";
body!.style.padding = 0 + "px";

const URL: string = `https://api.coingecko.com/api/v3/coins/${currensyId}/market_chart/range?vs_currency=${vsCurrensy}&from=${from}&to=${to}`; 

const http: HTTP = new HTTP(URL);

http.send()
.then((data) => {
    return new DataTransformer(data).transform(); 
})
.then((data) => {
    console.log(data);
    ctx!.save(); 

    let chart = new Chart(ctx, data);
    window.addEventListener('resize', () => {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx!.restore();
        chart = new Chart(ctx, data);
    });
    
})

// const chart = new Chart("#canvas");


