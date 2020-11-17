import {DataSource,CollectionViewer} from '@angular/cdk/collections';
import {Observable, of,fromEvent, Subject, BehaviorSubject} from 'rxjs';
import {map, startWith,debounceTime,catchError,finalize,delay} from 'rxjs/operators';
import {ICleanedBankStatementcontents,IVendorList} from './interface/IGeneratedBankStatement';
//import {required2Directive, IsNullOrWhitespace, required2Validator} from '../helperFunc/required2.validator';

//we need to wrap the source data, and provide some extra properties to help bind to datatable.
//we also put object validation funtion here. 
//So, object itself will verify if itself data valid. 
export class cObject {
public readonly Obj: ICleanedBankStatementcontents; //the real source data

  //helper properties
  public readonly ObjStatus$: BehaviorSubject<ObjectEditStatus>=new BehaviorSubject<ObjectEditStatus>(ObjectEditStatus.unChanged);
  public readonly ObjId: number; //unique identify number. independ from source data ID.
  public readonly ObjDataValid$: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(true);

  //constructor
  constructor (m:ICleanedBankStatementcontents, e:ObjectEditStatus=ObjectEditStatus.unChanged) {
    this.Obj=m;
    this.ObjId= Math.floor(Math.random()*100000); //please ensure it is no duplicate

    //when edit status changed, check if new data valid
    this.ObjStatus$.subscribe(s=>{
      if (s===ObjectEditStatus.Modified || s===ObjectEditStatus.Added) {
        this._myObjDataValid(); //check if the data is valid
      }
    })

    this.ObjStatus$.next(e);
  }

  private _myObjDataValid():void{
    //if valid, ObjDataValid$ emit true, otherwise, false
    if (this._isNullOrWhitespace(this.Obj.date)) {this.ObjDataValid$.next(false);return}
    if (this._isNullOrWhitespace(this.Obj.description)) {this.ObjDataValid$.next(false);return}
    if (this._isNullOrWhitespace(this.Obj.amount)) {this.ObjDataValid$.next(false);return}
    //else
    this.ObjDataValid$.next(true); return;
  }

  private _isNullOrWhitespace( input ) {
    return (typeof input === 'undefined' || input == null) || input.replace(/\s/g, '').length < 1;
  }
}

export enum ObjectEditStatus {
  unChanged=1,
  Modified=2,
  Added=4,
  Deleted=8,
}

//refer to https://blog.angular-university.io/angular-material-data-table/
export class MatTableDataSource extends DataSource<cObject> {
  private _objectStore: cObject[]= []; //internal stored source data
  private _ObjectsSubject$ = new BehaviorSubject<cObject[]>([]);
  private _loadingSubject$ = new BehaviorSubject<boolean>(false);

  public loading$ = this._loadingSubject$; //loading indicator

  constructor() {
    super();
  }

   /*MatTable connect to a Subject, and waiting for Subject.next emit array */
  connect():BehaviorSubject<cObject[]> {
    return this._ObjectsSubject$;
  }

  disconnect() {
    this._ObjectsSubject$.complete();
    this._loadingSubject$.complete();
  }


//   public loadItems(){
//     this._loadingSubject$.next(true); //indicate date is loading
//     this._objectStore=[]; //clear current stored data
//     this._ObjectsSubject$.next(this._objectStore);

//     //call service to load data
//     this.cService.getMatItems().pipe(
//       delay(300), //simulate long network running
//       catchError(() => of([])), //return a empty array
//       finalize(() => this._loadingSubject$.next(false))
//     ).subscribe((res: ImatItem[])=>{
//         res.forEach(m=>this._objectStore.push(new cObject(m))); //store to local 
//         this._ObjectsSubject$.next(this._objectStore);
//       }
//     );

//   };

 

  public CommitAllChanges():void{
    if(this._objectStore) {
      this._objectStore.forEach(m=>{
          m.ObjStatus$.next(ObjectEditStatus.unChanged);
        }
      )
    }
  };
  
//   public CommitItem(res: cObject):void {
//     if (!res || !res.Obj){return;}
//     let d=res.ObjId;
//     if (res.Obj.id) {
//         //this item come from server, we need commit change operation to server

//     } else {
//       //new added item, we need commit add new operation to server
//       console.log(res);
//     }
    
//     res.ObjStatus$.next(ObjectEditStatus.unChanged);
//   }
  

  public sortData(s) {
    console.log(s);
  }
  
 
}