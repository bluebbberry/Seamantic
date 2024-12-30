import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userInfo?: any;
  private url: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  fetchUserInfo() {
    const headers = { 'content-type': 'application/json'};
    return this.http.get<any>(`${this.url}/user`, { headers: headers }).subscribe((response: any) => {
      console.log(response);
      this.userInfo = response["requestBody"];
    });
  }
}
