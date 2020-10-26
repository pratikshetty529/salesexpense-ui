import {Injectable, EventEmitter} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({'accept': "application/json;odata=verbose"})
};

export interface ImatItem {
    date: string;
    description:string;
    amount:string;
    vendor:string;
    account:string;
    flag:string;
  };


export interface IopItem {
  name:string;
  abbreviation: string;
};

//@Injectable()
// export class cHttpDataService{
//   private testGetUrl: string='https://jsonplaceholder.typicode.com/users';
//   private OptionListUrl: string='https://jsonplaceholder.typicode.com/todos'
//   private USstatesUrl: string='https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json';


//   constructor(private http:HttpClient){};

//   public createNewMatItem(): ImatItem {
//     return {id:undefined, 
//             name:null,
//             website: undefined,
//             email: null,
//             amount:null,
//             address: {
//               state: null,
//               city: null,
//               zipcode: undefined,
//               geo: {
//                 lat: undefined,
//                 lng: undefined},
//             }
//           } as ImatItem;
//   };


//   public getMatItems():Observable<ImatItem[]>{
//     return this.http.get<ImatItem[]>(this.testGetUrl, httpOptions).pipe(
//       map(res=>res as ImatItem[])
//     )

//   };

//   public getOptionList():Observable<IopItem[]>{
//     return this.http.get(this.USstatesUrl, httpOptions).pipe(
//       map(res=>res as IopItem[]), //httpclient.get only emit one object, that is http response.
//       map(items=>items.sort(this.opItemCompareFunc)) //sort http returned array
//     );
//   };

//   private opItemCompareFunc(a:IopItem,b:IopItem):number{
//     if (a.name<b.name)
//       return -1;
//     if (a.name>b.name)
//       return 1;
//     return 0;
//   }
// }