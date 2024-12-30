import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeLevelService {
  public seLevel: number = 0;
  public MAXIMUM_SE_LEVEL = 2;

  constructor() { }
}
