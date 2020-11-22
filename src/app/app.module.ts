import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { GameslistComponent } from './components/gameslist/gameslist.component';
import { GamedetailComponent } from './components/gamedetail/gamedetail.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SafeurlPipe } from './pipes/safeurl/safeurl.pipe';
import { LightboxModule } from 'ngx-lightbox';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		GameslistComponent,
		GamedetailComponent,
		SafeurlPipe
	],
	imports: [
		BrowserModule,
		HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    LightboxModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
