import { Component } from '@angular/core';
import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animal.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  animales: Animal[] = [];

  audio = new Audio();

  constructor() {
  
    this.animales = ANIMALES.slice(0); /*para clonar los datos del data*/
  
  }
/* funcion que se ejecuta al hacer click*/
  reproducir( animal: Animal){
    this.pausar_audio(animal);

    if (animal.reproduciendo) {
      animal.reproduciendo = false;
      return;
    }

    console.log(animal);
    
    this.audio.src = animal.audio;
    
    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.audioTiempo = setTimeout( () => animal.reproduciendo = false, animal.duracion * 1000 );
  }

  private pausar_audio( animalSel: Animal){
    clearTimeout(this.audioTiempo);
    this.audio.pause();
    this.audio.currentTime = 0;

    for ( let animal  of this.animales) {
      if ( animal.nombre != animalSel.nombre ){
        animal.reproduciendo = false;
      }
      
    }
  }

  borrar_animal(idx: number){
    this.animales.splice(idx, 1); //eliminando un registro
  }
  recargar_animales (refresher: any ){
  
    console.log('inicio del refresh');
    setTimeout(() =>{
      console.log("Termino de realizar el temporizador");
      this.animales = ANIMALES.slice(0);
    } );
  }

}
