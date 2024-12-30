import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MicroblogService {
  private url: string = "http://localhost:3000";
  public homeStatuses?: any[];
  public localStatuses?: any[];
  public globalStatuses?: any[];
  public semanticStatuses?: any[];

  constructor(private http: HttpClient) { }

  sendMessage(message: string, onSuccess: any): void {
    const headers = { 'content-type': 'application/json'};

    this.http
      .post<any>(`${this.url}/statuses`, {message: message, sidekick: "larry"}, { headers: headers})
      .subscribe(
        (response: any) => {
          console.log("Success");
          onSuccess();
        },
        (error) => {
          console.error(error);
          onSuccess();
      });
  }

  fetchHomeStatuses() {
    this.homeStatuses = undefined;
    const headers = { 'content-type': 'application/json'};
    return this.http.get<any>(`${this.url}/statuses/home`, { headers: headers }).subscribe((response: any) => {
      console.log(response);
      response["requestBody"].forEach((status: any) => { status.descendants = [] });
      this.homeStatuses = response["requestBody"];
    });
  }

  fetchSemanticStatuses() {
    this.semanticStatuses = undefined;
    const headers = { 'content-type': 'application/json'};
    return this.http.get<any>(`${this.url}/statuses/semantic`, { headers: headers }).subscribe((response: any) => {
      console.log(response);
      response["requestBody"].forEach((status: any) => { status.descendants = [] });
      this.semanticStatuses = response["requestBody"];
    });
  }

  getDescendantsOfPost(status: any, onSuccess: any) {
    const headers = { 'content-type': 'application/json'};
    return this.http.get<any>(`${this.url}/statuses/${status.id}/children`, { headers: headers }).subscribe((response: any) => {
      console.log(response);
      onSuccess(response);
    });
  }

  addDescendant(status: any, responseElement: any) {
    let filter = this.homeStatuses?.filter(s => s.id === status.id);
    if (filter) {
      filter.forEach(status => {
        status.descendants.push(responseElement);
      });
      console.log(filter);
    }
  }

  fetchLocalStatuses() {
    this.localStatuses = undefined;
    const headers = { 'content-type': 'application/json'};
    return this.http.get<any>(`${this.url}/statuses/local`, { headers: headers }).subscribe((response: any) => {
      console.log(response);
      response["requestBody"].forEach((status: any) => { status.descendants = [] });
      this.localStatuses = response["requestBody"];
    });
  }

  fetchGlobalStatuses() {
    this.globalStatuses = undefined;
    const headers = { 'content-type': 'application/json'};
    return this.http.get<any>(`${this.url}/statuses/global`, { headers: headers }).subscribe((response: any) => {
      console.log(response);
      response["requestBody"].forEach((status: any) => { status.descendants = [] });
      this.globalStatuses = response["requestBody"];
    });
  }
}
