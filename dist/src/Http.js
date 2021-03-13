var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Http {
    constructor(url, method = "GET", data = "") {
        this.options = {};
        this.url = url;
        this.method = method;
        this.data = data;
        if (this.data != "" && method != "GET") {
            this.options.headers = {
                'Content-Type': 'application/json;charset=utf-8'
            },
                this.options.data = data.toString();
            this.options.method = this.method;
        }
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(this.options);
            const response = yield fetch(this.url, this.options);
            const data = yield response.json();
            return data;
        });
    }
}
