import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { GamesService } from 'src/services/games.service';
import { Lightbox } from 'ngx-lightbox';


@Component({
  selector: 'app-gamedetail',
  templateUrl: './gamedetail.component.html',
  styleUrls: ['./gamedetail.component.scss']
})
export class GamedetailComponent implements OnInit {
  faCalendar = faCalendarAlt;
  private _albums: any  = [];

  constructor(private _GamesService: GamesService, public activatedRoute: ActivatedRoute, private _lightbox: Lightbox) { }

  game: any = {};
  public gamesImgsList: any = [];
  gameImgTop: number;
  devAndPubDifferents: boolean;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parameters => {
      this._GamesService.getGame(parameters['id']).subscribe(responseGame => {
        this._GamesService.getImages(responseGame['slug']).subscribe(response => {
          this.game = responseGame;
          this.gamesImgsList = response['results'];
          this.gameImgTop = this.Numbers(0, this.gamesImgsList.length-1); // get number for random img on top
          this.devAndPubDifferents = (this.game.developers[0].name == this.game.publishers[0].name) ? false : true;

          for (let i = 0; i <= this.gamesImgsList.length; i++) {
            const src = this.gamesImgsList[i].image;
            const caption = '';
            const thumb = this.gamesImgsList[i].image;
            const album = {
               src: src,
               caption: caption,
               thumb: thumb
            };

            this._albums.push(album);
          }

        })
      })
    })
  }

  Numbers(min,max){
    return(Math.floor(Math.random()*(max-min+1)+min));
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._albums, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
}

