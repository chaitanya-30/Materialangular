import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  postproduct(data:any){
    return this.http.post<any>("http://localhost:3000/Products/",data);

  }
  getproduct(){
    return this.http.get<any>("http://localhost:3000/Products/");
  }
  putproduct(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/Products/"+id,data);

  }
  deleteproduct(id:number){
    return this.http.delete<any>("http://localhost:3000/Products/"+id);
  }
}
