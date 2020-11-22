import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../../../services/games.service';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-gameslist',
  templateUrl: './gameslist.component.html',
  styleUrls: ['./gameslist.component.scss']
})
export class GameslistComponent implements OnInit{
  searchTermInput: string = '';
  gamesList:any [];

  fasStar = fasStar;
  faCalendar = faCalendarAlt;

  constructor(private _GamesService: GamesService, public route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParamMap.subscribe(params => {
      //this._GamesService.loading = true;
      this.searchTermInput = this.route.snapshot.queryParams.searchTermInput;

      if (this.searchTermInput == undefined || this.searchTermInput == '') {
        this._GamesService.getGames().subscribe(data => {
          this.gamesList = data['results'];
          console.log(this.gamesList);
          this._GamesService.loading = false;
        },
        error => {console.log(error)});
      } else {
        this._GamesService.searchGame(this.searchTermInput).subscribe(data => {
          this.gamesList = data['results'];
          console.log(this.gamesList);

          this._GamesService.loading = false;
        });
      }
    })
  }
}
