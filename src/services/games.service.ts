import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  // Base URL
  urlGameDb: string ="https://api.rawg.io/api"

  constructor(private http: HttpClient) { }

  getGames() {
    return this.http.get(`${this.urlGameDb}/games`);
  }
}
