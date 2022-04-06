import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//Ce service me permet de faire des requêtes pour InfoChampion et de relier le composant Header à Information-champion 
export class InfoChampService {
  private reactualiseLeNomDuChamp: ()=>void;  //Le corps d'une fonction(il va me permettre de réutiliser la fonction afficheChamp dans la classe Information-champion )
  private champ:string="Aatrox"; //le nom du champion 
  constructor() {
    this.reactualiseLeNomDuChamp=this.neFaitRien.bind(this);
   }

 //Cette méthode permet d'avoir le corps de la methode passé en paramètre dans ma variable ce qui permettra d'utiliser la méthode dans mon service.
   actualiseToi(fn:()=>void){
    this.reactualiseLeNomDuChamp=fn;
  }

  //Cette méthode renvoie le nom du champion
  getChamp():string{
    return this.champ;
  }

  //Cette méthode change le nom du champion et reappelle la méthode afficheChamp avec la methode reactualiseLeNomDuChamp()
  setNomChamp(champ:string){
    this.champ=champ;
    this.reactualiseLeNomDuChamp();
  }
  neFaitRien(){
    //uniquement pour initaliser la variable reactualiseToi
  }
}
