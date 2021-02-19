"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// initialize app
var Main = /** @class */ (function () {
    // constructor
    function Main() {
        // assign DOM_Elements
        this.canvas = document.querySelector("#canvas");
        this.ctx = this.canvas.getContext("2d");
        // assign properties
        this.canvasWidth = window.screen.width;
        this.canvasHeight = window.screen.height;
        this.lineColor = "#00D3FF";
        this.gridColor = "rgba(255,255,255,0.04)";
        this.gridThickness = "1px";
        this.shadowColor = "#00D3FF";
        this.shadowProperties = "0px 0px 16px";
        // this.backgroundColor = "#111E2E";
        this.backgroundColor = "rgb(17,30,46)";
        this.vsCurrensy = "usd";
        this.from = 1613422800;
        this.to = 1613672582;
    }
    Main.prototype.startApplication = function () {
        return __awaiter(this, void 0, void 0, function () {
            var drawCanvas, chartData, drawGrid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new DrawCanvas()];
                    case 1:
                        drawCanvas = _a.sent();
                        return [4 /*yield*/, new Transformdata().transform()];
                    case 2:
                        chartData = _a.sent();
                        return [4 /*yield*/, new DrawGrid(chartData).draw()];
                    case 3:
                        drawGrid = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Main;
}());
// draw canvas
var DrawCanvas = /** @class */ (function (_super) {
    __extends(DrawCanvas, _super);
    function DrawCanvas() {
        var _this = _super.call(this) || this;
        _this.canvas.width = _this.canvasWidth;
        _this.canvas.height = _this.canvasHeight;
        _this.canvas.style.backgroundColor = _this.backgroundColor;
        _this.canvas.style.position = "absolute";
        _this.canvas.style.top = 0;
        _this.canvas.style.left = 0;
        return _this;
    }
    return DrawCanvas;
}(Main));
// transforming http response
var Transformdata = /** @class */ (function (_super) {
    __extends(Transformdata, _super);
    function Transformdata() {
        return _super.call(this) || this;
    }
    Transformdata.prototype.transform = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, data, chartData, prices, pricesLength, i, timestamp, chartDataItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = new HTTP("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=" + this.from + "&to=" + this.to);
                        return [4 /*yield*/, query.send()];
                    case 1:
                        data = _a.sent();
                        chartData = {};
                        prices = data.prices;
                        pricesLength = prices.length;
                        for (i = 0; i < pricesLength; i++) {
                            timestamp = new Date(prices[i][0]).getHours().toString();
                            chartDataItem = {
                                timestamp: timestamp,
                                value: prices[i][1],
                            };
                            chartData[i] = chartDataItem;
                        }
                        console.log(chartData);
                        return [2 /*return*/, chartData];
                }
            });
        });
    };
    return Transformdata;
}(Main));
// create grid 
var DrawGrid = /** @class */ (function (_super) {
    __extends(DrawGrid, _super);
    function DrawGrid(chartData) {
        var _this = _super.call(this) || this;
        _this.chartData = chartData;
        return _this;
    }
    DrawGrid.prototype.draw = function () {
        console.log(this.chartData);
        var timestampMargin = this.canvasWidth / Object.keys(this.chartData).length;
        var chartDataLength = Object.keys(this.chartData).length;
        for (var i = 0; i < chartDataLength; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * timestampMargin, 0);
            this.ctx.lineTo(i * timestampMargin, this.canvasHeight);
            this.ctx.strokeStyle = this.gridColor;
            this.ctx.lineWidth = this.gridThickness;
            this.ctx.fillText(this.chartData[i].timestamp, i * timestampMargin, this.canvasHeight - 30);
            this.ctx.stroke();
        }
    };
    return DrawGrid;
}(Main));
var DrawChart = /** @class */ (function (_super) {
    __extends(DrawChart, _super);
    function DrawChart() {
        return _super.call(this) || this;
    }
    return DrawChart;
}(Main));
var HTTP = /** @class */ (function () {
    function HTTP(url, method, data) {
        if (method === void 0) { method = "GET"; }
        if (data === void 0) { data = ""; }
        this.options = {};
        this.url = url;
        this.options.method = method;
        if (this.data != "" && method != "GET") {
            this.options.headers = {
                'Content-Type': 'application/json;charset=utf-8'
            },
                this.options.data = data.toString();
        }
    }
    HTTP.prototype.send = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this.options);
                        return [4 /*yield*/, fetch(this.url, this.options)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return HTTP;
}());
new Main().startApplication();
