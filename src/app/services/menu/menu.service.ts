import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Menu } from 'src/app/model/menu';
import { APIS } from '../APIs/apis';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menuURL = APIS.menuURL;
  constructor(private _http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  createMenu(menu: Menu): Observable<any>{
    return this._http.post<Menu>(this.menuURL, JSON.stringify(menu),this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getMenusByUser():Observable<any>{
    return this._http.get<any>(this.menuURL  +"user").pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  getMenus():Observable<any>{
    return this._http.get<any>(this.menuURL).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getMenuById(id: any):Observable<any>{
    return this._http.get<any>(this.menuURL +id).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  updateMenu(id:any, shop: any):Observable<any>{
    return this._http.patch<any>(this.menuURL+id, JSON.stringify(shop), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteMenu(id: any):Observable<any>{
    return this._http.delete<any>(this.menuURL+id).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  handleError(error: any){
    console.log({error})
    let errorMessage="";
    errorMessage = error.error.msg
    return throwError(errorMessage);
  };
}
