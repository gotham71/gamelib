import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class GamesService {
  loading:boolean = false;
  currentDate = new Date();
  currentYear: number = this.currentDate.getFullYear();
  currentMonth: number = this.currentDate.getMonth()+1;
  lastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
  firstDayMonth: string;
  lastDayMonth: string;

    // Base URL
  urlGameDb: string ="https://api.rawg.io/api"

  constructor(private http: HttpClient) { }

  // public getHeaders() {
  //   let headers = new HttpHeaders({
  //     'User-Agent': 'gameslib',
  //     'Accept': 'application/json',
  //     'Access-Control-Allow-Origin': '*'
  //   });
  //   return headers;
  // }


  getGames() {
    if (this.currentMonth < 10) {
      this.firstDayMonth = this.currentYear + '-0' + this.currentMonth + '-01';
      this.lastDayMonth = this.currentYear + '-0' + this.currentMonth + '-' + this.lastDay;
    } else {
      this.firstDayMonth = this.currentYear + '-' + this.currentMonth + '-01';
      this.lastDayMonth = this.currentYear + '-' + this.currentMonth + '-' + this.lastDay;
    }
  	return this.http.get(`${this.urlGameDb}/games?platforms=1,2,3,7&dates=${this.firstDayMonth},${this.lastDayMonth}&rating=released&page_size=40`);
  }

  getGame(slug) {
	  return this.http.get(`${this.urlGameDb}/games/${slug}`);
  }

  getImages(slug) {
    return this.http.get(`${this.urlGameDb}/games/${slug}/screenshots`);
  }

  searchGame(searchTerm: string, page: number = 1) {
    return this.http.get(`${this.urlGameDb}/games?search=${searchTerm}&page=${page}&page_size=40`);
  }

  searchGameNext(url: string) {
    return this.http.get(url);
  }
}
