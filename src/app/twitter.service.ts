import { Component, Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
//Ce service me permet de faire ma requête pour obtenir le fichier JSON et de relier Header à Tweet
export class TwitterService {
  private url = "http://localhost:8010/proxy?query=%23"; //Malheureusement je dois utiliser un proxy donc elle est de ce type là
  private bearerToken= "AAAAAAAAAAAAAAAAAAAAABQpYQEAAAAAanMtqZc%2FjbF1W%2Br3Ft%2FTw2MSh%2FQ%3DcMvSdm9ht9J08Fl8YHN0Iz7dmHPwYzilke83U3g3TVjERhXD0S";
  private hashtag="LeagueofLegends"; //le hashtag qui concerne le jeu
  private nom="Aatrox"; //Le champion que je veux rechercher par défaut c'est Aatrox
  private reactualiseLeHashtag: ()=> void; //Un corps de methode utiliser pour que cette variable se fasse passé pour une méthode
  constructor(private http: HttpClient) {
    this.reactualiseLeHashtag=this.neFaitRien.bind(this);
  }

  //Methode qui me retourne ma requete
  getTweet(){
    //je dois créer un header pour être autoriser à l'api twitter
    var header = new HttpHeaders().set('Access-Control-Allow-Origin','*')
    .set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")     
    .set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")     
    .set("Authorization", "Bearer " + this.bearerToken);
    return this.http.get(this.url + this.hashtag+"+"+this.nom+"&sort_order=relevancy&tweet.fields=possibly_sensitive", {'headers': header});
  }

  //Methode qui change la valeur du hashtag et reappelle la methode contenu dans ma classe Tweet 
  setHashtag(value){
    this.nom=value;
    this.reactualiseLeHashtag();
  }

  //Vu qu'on ne peut passer appeler de methode d'une classe à un service je suis passé par la création de cette methode
  //pour prendre le corps d'une methode et la mettre dans ma variable reactualiseLeHashtag
  actualiseToi(fn: () => void){
    this.reactualiseLeHashtag=fn;
  }


  neFaitRien(){
    //Cette méthode ne fait rien,il ne sert qu'à intialiser la variable reactualiseLeHashtag
  }
}
