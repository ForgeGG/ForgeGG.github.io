import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../twitter.service';


@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
//Cette class me sert à manipuler les données reçus avec la requête qui est dans mon service twitter pour avoir le fichier JSON
//en question et pouvoir afficher mes tweets
export class TweetComponent implements OnInit {


  idTweet1: string; //Variable qui va contenir l'id du premier tweet
  idTweet2: string; //Variable qui va contenir l'id du deuxieme tweet
  idTweet3: string; //Variable qui va contenir l'id du troisieme tweet
  affiche: boolean; //Variable qui permet de savoir si je dois afficher les tweets ou non
  constructor(private service: TwitterService) {
    this.idTweet1="Le tweet 1";
    this.idTweet2="Le tweet 2";
    this.idTweet3="Le tweet 3";
    this.affiche=false;
   }

  ngOnInit(): void {
    this.afficherTweet();
    this.service.actualiseToi(this.afficherTweet.bind(this)); //J'appelle la methode de mon service pour qu'il puisse avoir le corps de la fonction
                                                              // de afficheTweet()
  }

  //Méthode qui me permet d'afficher mes 3 tweets.
  afficherTweet(): void{
    var fichier; //il va contenir mon fichier json 

    this.affiche=false;
    //Je fais ma requête et j'attend une réponse du côté serveur avec subscribe()
    this.service.getTweet().subscribe(data =>{
      fichier=JSON.parse(JSON.stringify(data)), //je stock le fichier json
      console.log("texte API TWITTER: ",fichier);
      //Je stock les id des tweets
      this.idTweet1=fichier.data[0].id;
      this.idTweet2=fichier.data[1].id;
      this.idTweet3=fichier.data[2].id;
      var Tweet1=fichier.data[0];
      var Tweet2=fichier.data[1];
      var Tweet3=fichier.data[2];
      let i=0;
      //Je vérifie que mes tweet n'ont pas de contenu choquant (même si leur filtre ne marche pas trop)
      //si il y en a, je prend le tweet suivant et ainsi de suite 
      for(i=0;Tweet1.possibly_sensitive==true ||Tweet2.possibly_sensitive==true ||Tweet3.possibly_sensitive==true ;i++)
        if(Tweet1.possibly_sensitive==true){
          Tweet1=fichier.data[i];
        }
        if(Tweet2.possibly_sensitive==true){
          Tweet2=fichier.data[i];
        }
        if(Tweet3.possibly_sensitive==true){
          Tweet3=fichier.data[i];
        }
      this.idTweet1=Tweet1.id;
      this.idTweet2=Tweet2.id;
      this.idTweet3=Tweet3.id;
      this.affiche=true;
      //J'affiche dans la console les id des tweets
      console.log(this.idTweet1); 
      console.log(this.idTweet2);
      console.log(this.idTweet3);
    });
  }


}
