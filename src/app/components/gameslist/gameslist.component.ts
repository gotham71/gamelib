import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
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
  gamesListCount:number;
  page:number;
  next:any;
  fasStar = fasStar;
  faCalendar = faCalendarAlt;
  pos:number;
  max:number;
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    console.log('scrolling');
    //In chrome and some browser scroll is given to body tag
    console.log('scrolltop: ' + document.documentElement.scrollTop);
    console.log('offsetHeight: ' + document.documentElement.offsetHeight);
    console.log('window.innerHeight: ' + window.innerHeight);


    this.pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
    this.max = document.documentElement.scrollHeight;
    //console.log(pos);
    console.log(this.max);

    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if(Math.trunc(this.pos) == Math.trunc(this.max) )   {
    //Do your action here

    //console.warn('pepe');
    this.MoreData();
  }
}

  constructor(private _GamesService: GamesService, public route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParamMap.subscribe(params => {
      //this._GamesService.loading = true;
      this.searchTermInput = this.route.snapshot.queryParams.searchTermInput;

      if (this.searchTermInput == undefined || this.searchTermInput == '') {
        this._GamesService.getGames().subscribe(data => {
          this.gamesList = data['results'];
          this.gamesListCount = data['count'];
          this.next = data['next'];

          this._GamesService.loading = false;
        },
        error => {console.log(error)});
      } else {
        this._GamesService.searchGame(this.searchTermInput).subscribe(data => {
          this.gamesList = data['results'];
          this.gamesListCount = data['count'];
          this.next = data['next'];

          this._GamesService.loading = false;
        });
      }
    })
  }

  MoreData() {

      this._GamesService.searchGameNext(this.next).subscribe(data => {

        this.gamesList = this.gamesList.concat(data['results']);
        this.next = data['next'];
        // const array1= this.gamesList;
        // const array2= data['results'];
        // const mergedArray = [ ...array1, ...array2 ]

        // this.gamesList = mergedArray;
      });
    }

}
