import HttpInterface from "./interfaces/HttpInterface";
import OptionsInterface from "./interfaces/OptionsInterface";


export default class Http implements HttpInterface {
     public url: string;
     public method: string;
     public data: any;

     private options: OptionsInterface = {

     }

     constructor (url: string, method: string = "GET", data = "") {
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

     async send(): Promise<object> {
          // console.log(this.options);
          const response = await fetch(this.url, this.options);
          const data = await response.json();
          return data;
     }
}