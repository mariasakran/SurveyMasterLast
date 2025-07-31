import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  private apiUrl = 'http://localhost:8088/categories';

  constructor(private http: HttpClient) {}

  addCategory(category: any): Observable<any> {
    return this.http.post(this.apiUrl, category);
  }
getcategories(){
  return this.http.get(this.apiUrl);
}
DeleteCategory(num: number){
  return this.http.delete(`${this.apiUrl}/${num}`).subscribe({
  });

}
UnAcceptedCategory(){
  return this.http.get(`${this.apiUrl}/getUnAcceptedCategory`);
}

AcceptedCategory(){
  return this.http.get(`${this.apiUrl}/getAcceptedCategory`);
}
isAccepted(categoryId: number){
  return this.http.put(`${this.apiUrl}/IsAccepted/${categoryId}`,{});
}
}
