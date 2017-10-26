import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {

  public objeto_feed = {
    titulo:"Luisandro Bandeira",
    data:"November 5, 1955",
    descricao:"Criando um App com IONIC 3.",
    qtde_like: 12,
    qtde_comment: 4,
    time_comment:"11h ago"
  }

  public lista_filmes = new Array<any>();

  public loading; 
  public refresher;
  public isRefreshing : boolean = false;

  public nome_usuario:string = "Luisandro váriavel do código";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController
  ) { }

  doRefresh(refresher) {

    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();

    console.log('Begin async operation', refresher);

  }

  abreCarregando() {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });
  
    this.loading.present();
  
    // setTimeout(() => {
    //   loading.dismiss();
    // }, 5000);
  }

  fechaCarregando(){
    this.loading.dismiss();
  }

  public somaDoisNumeros(valor1:number, valor2:number) : void{
    alert(valor1 + valor2);
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  carregarFilmes(){

    console.log('carregarFilmes FeedPage');
    this.abreCarregando();
    
    this.movieProvider.getLatesMovies().subscribe(
      data=>{
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.lista_filmes = objeto_retorno.results;
        this.fechaCarregando();
        if (this.refresher){
          this.refresher.complete();
          this.refresher.isRefreshing = false;
        }
        console.log(objeto_retorno);        
      },
      error => {
        this.fechaCarregando();
        if (this.refresher){
          this.refresher.complete();
          this.refresher.isRefreshing = false;
        }
        console.log(error);
      }
    )
  }


}
