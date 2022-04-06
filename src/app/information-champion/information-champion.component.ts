import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { InfoChampService } from '../info-champ.service';

@Component({
  selector: 'app-information-champion',
  templateUrl: './information-champion.component.html',
  styleUrls: ['./information-champion.component.css']
})
//Ce composant sert à afficher les informations d'un champion à l'aide de requête
export class InformationChampionComponent implements OnInit {

  private urlJSON = "http://ddragon.leagueoflegends.com/cdn/12.5.1/data/fr_FR/champion.json"; //L'url pour avoir le fichier json de tous les champions
  private urlChamp = "http://ddragon.leagueoflegends.com/cdn/12.5.1/data/fr_FR/champion/";//l'URL pour avoir un champion en particulier 
  private urlLoad = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"; //l'URL pour avoir les images des skins du champion
  private urlPassive = "http://ddragon.leagueoflegends.com/cdn/12.5.1/img/passive/"; //l'URL pour avoir l'image du passif
  private urlSpell = "http://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/"; //l'URL pour avoir les images des sorts
  
  lore: string; //L'histoire du champion
  skins: Array<string>; //les skins d'un champion
  nomChamp: string; //le nom du champion
  tabDesc: Array<string>; //le tableau des descriptions des sorts
  champions:any; //va contenir le fichier JSON
  nomsSort:Array<string>;  // le tableau des noms des sorts
  constructor(private http: HttpClient,private service: InfoChampService) {
    this.lore = "L'histoire du Champion"; 
    this.skins = [""];
    this.nomChamp = "Jinx";
    this.tabDesc = [""];
    this.champions="liste de champions";
    this.nomsSort=[""];
  }
  

  ngOnInit(): void {
    let champions;
    this.http.get(this.urlJSON).subscribe(data =>{ //La requête pour récupérer le fichier JSON des champions
      localStorage.setItem(champions,JSON.stringify(data)); //Utilisation du stockage local du navigateur pour récupérer le fichier JSON
    });
    this.champions=localStorage.getItem(champions);
    localStorage.clear(); //Et je supprime tous ce qu'il y a dans le stockage local
    this.afficheInfoChamp();
    this.service.actualiseToi(this.afficheInfoChamp.bind(this)); //Je met la fonction afficheInfoChamp dans la variable du service info-champ
   
  }

  //Affiche les informations des champions
  afficheInfoChamp(){
    let champions;
    let champion;
    let name;
    let nomChampion = document.getElementById("nomChampion")!; //ça me permet de changer le nom du champion dans le html
    let loreChamp = document.getElementById("loreChamp")!; //Pareil pour la description du champion
    let slider = new Array(); //je stock les numéros des skins du champions
    let tabSpell = new Array(); //je stock les sorts du champion
    let tabDescSpell = new Array(); //je stock les descriptions des sorts
    let desc = document.getElementById("desc")!; //je change la description du sort dans le html
    desc.style.display="none";

    this.nomChamp=this.service.getChamp(); //j'utilise le service pour avoir le nom du champion
    champions=JSON.parse(this.champions); //je rend lisable le fichier JSON
    Object.keys(champions.data).forEach(champ =>{ //Je regarde si il y a le nom du champion dans la liste des champions du fichier JSON
        JSON.parse(JSON.stringify(champ))         //et je l'affiche dans le html
        if(champ === this.nomChamp){
          name = champ;
          nomChampion.innerHTML = champ; //je change le nom du champion dans le html
        }
     });
      this.http.get(this.urlChamp + name + ".json").subscribe(data2 =>{ //Requête pour avoir le fichier JSON du champion
        champion = JSON.parse(JSON.stringify(data2)),
        console.log("Caractéristique du champion",champion);
        for (let index = 0; index < champion.data[name].skins.length; index++) { //Je met tous les numéros des skins dans le tableau slider
          slider[index] = champion.data[name].skins[index].num;
        }
        console.log(slider);
        for (let index = 0; index < slider.length; index++) { //Puis j'utilise le tableau slider pour mettre les images des skins dans le tableau
          this.skins[index] = this.urlLoad + name + "_" + slider[index] + ".jpg"; //des skins
        }
        console.log(this.skins);
        loreChamp.innerHTML = champion.data[name].lore; //je change la description du champion dans le html
        this.lore = champion.data[name].lore;
        let passive = document.getElementById("passive") as HTMLImageElement;
        passive.src = this.urlPassive+champion.data[name].passive.image.full; //je change l'image du passive du html
        for (let index = 0; index < champion.data[name].spells.length; index++) { 
          tabSpell[index] = champion.data[name].spells[index].id; //je met les id de sorts dans le tableau des sorts
          tabDescSpell[index] = champion.data[name].spells[index].description; //je met les descriptions des sorts dans le tableau des 
        }                                                                      //descriptions des sorts
        this.nomsSort[0]=champion.data[name].passive.name; //je met le nom du passive dans le tableau des noms des sorts
        for(let index=1;index<=champion.data[name].spells.length;index++){ //je met le nom des sorts dans le tableau des noms des sorts
          this.nomsSort[index]=champion.data[name].spells[index-1].name;
        }
        //Changement des images des sorts
        let spellQ = document.getElementById("QSpell") as HTMLImageElement;
        spellQ.src = this.urlSpell + tabSpell[0] + ".png";
        let spellW = document.getElementById("WSpell") as HTMLImageElement;
        spellW.src = this.urlSpell + tabSpell[1] + ".png";
        let spellE = document.getElementById("ESpell") as HTMLImageElement;
        spellE.src = this.urlSpell + tabSpell[2] + ".png";
        let spellR = document.getElementById("RSpell") as HTMLImageElement;
        spellR.src = this.urlSpell + tabSpell[3] + ".png";

        this.tabDesc[0] = champion.data[name].passive.description //je met la description du passive dans le tableau des descriptions des sorts
        for (let index = 1; index < tabDescSpell.length+1; index++) { //je met les descriptions des sorts dans le tableau des descriptions des sorts
          this.tabDesc[index] = tabDescSpell[index-1];
        }

      });
  }

  //Permet d'afficher la description du sort correspondant 
  afficherMasquer(index: number):void{
    let desc = document.getElementById("desc")!; //Cette variable va me permettre de changer la zone de description
    let spelldesc = document.getElementById("spellDesc")!; //Cette variable va me permettre de changer la description du sort
    let nomSpell=document.getElementById("nomSpell")!; //Cette variable va me permettre de changer le nom du sort
    

    if(spelldesc.innerHTML != this.tabDesc[index]) { //je regarde si la description n'est pas la même pour ne pas avoir à changer
      desc.style.display = "none"; //je rend pas visible pour changer
      nomSpell.innerHTML = this.nomsSort[index]; //je change le nom du sort
      spelldesc.innerHTML = this.tabDesc[index]; //je change la description du sort
    }
    
    if(desc.style.display == "none"){ //j'affiche la zone de description
      desc.style.display = "block";
    }else if(desc.style.display == "block"){ //je n'affiche plus la zone de description
      desc.style.display = "none";
    }



  }

}
