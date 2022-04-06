import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../twitter.service'; //Service pour utiliser l'api Twitter
import { MusiqueService } from '../musique.service'; //Service pour utiliser l'api Spotify
import { HttpClient } from '@angular/common/http';  //Module qui permet de faire des requêtes sur internet
import {InfoChampService} from '../info-champ.service'; //Service pour utiliser l'api DataDragon
declare var $: any;         //Utilisation de JQUERY grâce à cette variable

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
/*Cette classe est notre Header il contient la barre de recherche ainsi qu'un carousel, c'est le composant le plus important de notre site car
il "donne" les informations aux différents api des autres composants.
*/
export class HeaderComponent implements OnInit {
  private urlJSON = "http://ddragon.leagueoflegends.com/cdn/12.5.1/data/fr_FR/champion.json"; //le lien pour récupérer le fichier json de tous les champions
  private urlSplash = "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/"; //le lien pour récupérer les images des champions
  names: Array<string>; //On stock tous les noms des champions dans ce tableau
  skins: Array<string>; //On stock tous les noms des images d'un champion pour après les afficher
  value="Aatrox"; //la variable qui va stocker la valeur prise lors d'une recherche
  accept:boolean; //Cette variable permet d'éviter que le carousel bug 
  direction=""; //La direction du slider
  constructor(private service: TwitterService,private service2: MusiqueService,private service3:InfoChampService,private http:HttpClient) {

    this.names = [""];
    this.skins = [""];
    this.accept=false;
  }

  ngOnInit(): void {
    let champions;
    let nbChamp = 0;
    //La requête est effectué lors du démarrage du site pour récupérer le fichier json de tous les champions
    this.http.get(this.urlJSON).subscribe(lol =>{
      //lol contient le fichier json donc on le met dans notre variable champions mais avant on le modifie pour le rendre lisable
      champions = JSON.parse(JSON.stringify(lol))
      //Boucle pour remplir tous les noms des champions dans le tableau des noms
      Object.keys(champions.data).forEach(champ =>{
        this.names[nbChamp] = champ;
        nbChamp ++;
      });
      //Boucle pour remplir tous les skins des champions dans le tableau des skins
      for (let index = 0; index < this.names.length; index++) {
        this.skins[index] = this.urlSplash + this.names[index] + "_0.jpg";
      }
    });

    //Utilisation de JQuery pour avoir une auto-complétion pour notre barre de recherche
    $( "#search-text" ).autocomplete({
      source: this.names, //sur le tableau des noms
      minLength: 2 //s'active lorsque je met 2 lettres ou plus
    });
  
    //Supprime le petit bloc qui affiche les noms
    $(".ui-helper-hidden-accessible").remove();
    var self=this; //Je dois le mettre dans cette variable pour l'utiliser dans un fonction jquery
    //Permet d'avoir la direction du carousel lorsqu'un changement se produit
    $('#carouselExampleControls').bind('slide.bs.carousel',function(event){
      self.direction=event.direction;
    })
  }

  //Cette méthode est appelé lors du clic du carousel 
  carouselSlide(){
    this.accept=false;
    var index=$('div.active').index()+1; //je récupère l'index du carousel example : champion n°79=carousel n°79
    var totalItem=this.names.length; //je récupère la taille du tableau des noms
    if(this.direction.localeCompare("left") && this.accept==false){ //Ce bloc est nécessaire car la première fois que je clic sur le bouton précédent
      index=index-2;                                                //l'index va augmenter au lieu de décrémenter
      this.accept=true;
    }
    if(index==-1){ //Car la dernière case du tableau des noms est vide donc quand je clic sur le bouton précédent je vais retourner sur le dernier carousel
      index=totalItem-1;
    }
    if(index==totalItem){ //Car la dernière case du tableau des noms est vide donc quand je clic sur le bouton suivant je vais retourner sur le premier carousel
      index=0;
    }
    this.onEnter2(this.names[index]); //J'appelle cette méthode pour update les infos du nouveaux champion
  }


  //Cette méthode permet d'enregistrer la valeur de la barre de recherche et de faire passer l'information à des services qui eux vont passer l'info
  //aux autres composants
  onEnter(value: string){
    if($.inArray(value, this.names) !== -1){ //je regarde si la valeur est dans le tableau des noms (vu qu'on veut chercher des champions)
      this.value=value;
      console.log("value :"+ this.value);
      this.service.setHashtag(this.value); //Ce service est celui de Twitter
      this.service2.setMusic(this.value); //Ce service est celui de Spotify
      this.service3.setNomChamp(this.value); //Ce service est celui de DataDragon
      var list:Array<string>;
      list=this.names;
      var i=0;
      for(i=0;list[i]!=value;i++);
      let index=i++;
      $("#carouselExampleControls").carousel(index); //Le carousel va aller au carousel n°index
      $([document.documentElement, document.body]).animate({ //Scroll la page vers le bas pour aller sur les infos des persos 
        scrollTop: $("#carouselExampleControls2").offset().top
    }, 1500);
    }
  }
 
  //C'est la même méthode que celle du haut mais ne change pas le carousel (car on le change déjà en cliquant sur les boutons du carousel)
  onEnter2(value:string){
    if($.inArray(value, this.names) !== -1){
      this.value=value;
      console.log("value :"+ this.value);
      this.service.setHashtag(this.value);
      this.service2.setMusic(this.value);
      this.service3.setNomChamp(this.value);
    }
  }
}
