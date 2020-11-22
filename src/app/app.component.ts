import { Component } from '@angular/core';
import { GamesService } from 'src/services/games.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gamelib';
  constructor(private _GamesService: GamesService){}

  get loading(){
    return this._GamesService.loading;
  }
}
