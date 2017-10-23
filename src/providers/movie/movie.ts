import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {
  private baseApiPath = "https://api.themoviedb.org/3";
  private apiKey = "?api_key=d0458d90ba34a94cbf913ce417b30f33";
  constructor(public http: Http) {
    console.log('Hello MovieProvider Provider');
  }

  getLatesMovies(){
    return this.http.get(this.baseApiPath+"/movie/popular"+this.apiKey);
  }

}
