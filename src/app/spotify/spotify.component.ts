import { Component, OnInit } from '@angular/core';
import { MusiqueService } from '../musique.service';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})

//Cette class me sert à manipuler les données reçus avec la requête qui est dans mon service musique pour avoir le fichier JSON
//en question et pouvoir afficher mes musiques
export class SpotifyComponent implements OnInit {
  public src_str=""; //Me sert à stocker les différents lien 
  constructor(private service:MusiqueService) {
    
   }

  ngOnInit(): void {
   this.chercherMusique();
   this.service.actualiseToi(this.chercherMusique.bind(this)); //je vais mettre la méthode chercherMusique() dans une variable de mon service Musique 
  }

  //Cette méthode me permet de chercher les musiques puis de l'afficher
  public chercherMusique(){
    var fichier;// je stock mon fichier json dedans
    //j'effectue ma requete pour me connecter en appelant mon service 
    this.service.login().subscribe(res=>{
      console.log("Requête  token d'accès: "+JSON.stringify(res));
      let access_token=res['access_token']; //je récupère mon token d'accès pour effectuer des requête Get
      console.log("Le token d'accès: "+access_token);
      //j'effectue ma requete pour chercher des musiques
      this.service.getMusic(access_token).subscribe(res=>{
        fichier=JSON.parse(JSON.stringify(res)),
            console.log("texte API SPOTIFY: ",fichier);
            //je met les id des 3 premères musiques
            let id0=fichier.tracks.items[0].id;
            let id1=fichier.tracks.items[1].id;
            let id2=fichier.tracks.items[2].id;
            //Puis je met ce lien pour récupérer la musique sous forme miniaturisé
            //et je change le src de mon iframe corespondant dans le html et je le remplace par ce lien
            this.src_str=`https://open.spotify.com/embed/track/${id0}`;
            (<HTMLIFrameElement>document.getElementById('iframe0')).src =this.src_str;
            this.src_str=`https://open.spotify.com/embed/track/${id1}`;
            (<HTMLIFrameElement>document.getElementById('iframe1')).src =this.src_str;
            this.src_str=`https://open.spotify.com/embed/track/${id2}`;
            (<HTMLIFrameElement>document.getElementById('iframe2')).src =this.src_str;
            
          });

    })

  }


}
