import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
//Ce service me permet de faire des requêtes pour Spotify et de relier le composant Header à Spotify 
export class MusiqueService {
  private musique: string; //le nom de ma musique ça sera le nom du champion
  private token= ""; // le bearer.token pour faire des requêtes Get
  private client_id = "09494b0e1ebd49079d6444c51cd49a98"; //Le client_id
  private client_secret="f28c65fbc28242e682a44d6b1ddf9ae0"; //Le client_secret
  private encoder=btoa(this.client_id+":"+this.client_secret); //Encode le client id et le client secret
  private reactualiseLaMusique: ()=>void; //Le corps d'une fonction(il va me permettre de réutiliser la fonction chercherMusique dans la classe Spotify )
  
  constructor(private http:HttpClient) { 
    this.musique="Aatrox";
    this.reactualiseLaMusique=this.neFaitRien.bind(this);
  }

  //Cette méthode me permet de me connecter automatiquement avec le client_id et le client_secret
  login(){
    const authorizationTokenUrl = `https://accounts.spotify.com/api/token`; //le lien pour se connecter
    const body = 'grant_type=client_credentials'; // très important pour définir le type de connexion (là je me connecte avec le client_id)
                                                  //On aurait pu le faire avec un mot de passe...
    //La requete avec le header pour utiliser le client_id
    return this.http.post(authorizationTokenUrl, body, {
        headers: new HttpHeaders({
            Authorization:
                'Basic  ' + this.encoder,
            'Content-Type': 'application/x-www-form-urlencoded;',
        }),
    });
  }


  //Cette méthode renvoie la requête pour avoir des musiques
  getMusic(token:string){
    this.token=token;
    let URL= "https://api.spotify.com/v1/search?query="+this.musique+"&type=track"; //je cherche par track pour avoir les musiques 
                                                                                    //mais j'aurai pu chercher par artist pour avoir uniquement les musiques de cette artist
    var headers=new HttpHeaders().set('Authorization','Bearer '+this.token)
    .set('Content-Type','application/x-www-form-urlencoded')
    .set('Accept','application/json');
    return this.http.get<any>(URL,{headers: headers});
  }

  //Cette méthode change le nom de la musique et reappelle la méthode chercherMusique avec la methode reactualiseLaMusique()
  setMusic(music){
    this.musique=music;
    this.reactualiseLaMusique();
  }

  //Cette méthode permet d'avoir le corps de la methode passé en paramètre dans ma variable ce qui permettra d'utiliser la méthode dans mon service.
  actualiseToi(fn:()=>void){
    this.reactualiseLaMusique=fn;
  }

  neFaitRien(){
    //Cette méthode ne fait rien,il ne sert qu'à intialiser la variable reactualiseLeHashtag
  }
}
