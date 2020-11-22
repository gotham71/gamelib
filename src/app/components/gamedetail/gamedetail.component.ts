import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { GamesService } from 'src/services/games.service';

@Component({
  selector: 'app-gamedetail',
  templateUrl: './gamedetail.component.html',
  styleUrls: ['./gamedetail.component.scss']
})
export class GamedetailComponent implements OnInit {
  faCalendar = faCalendarAlt;

  constructor(private _GamesService: GamesService, public activatedRoute: ActivatedRoute) { }

  game: any = {};
  gamesImgsList: any = [];
  gameImgTop: number;
  devAndPubDifferents: boolean;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parameters => {
      this._GamesService.getGame(parameters['id']).subscribe(responseGame => {
        this._GamesService.getImages(responseGame['slug']).subscribe(response => {
          this.game = responseGame;
          this.gamesImgsList = response['results'];
          console.log(this.game);
          this.gameImgTop = this.Numbers(0, this.gamesImgsList.length-1); // get number for random img on top
          this.devAndPubDifferents = (this.game.developers[0].name == this.game.publishers[0].name) ? false : true;

        })
      })
    })
  }

  Numbers(min,max){
    return(Math.floor(Math.random()*(max-min+1)+min));
  }
}

