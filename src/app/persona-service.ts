import { DataService } from './data-service';
import { Injectable } from "@angular/core";
import { Persona } from "./persona.model";
import { Observable } from 'rxjs';

@Injectable()
export class PersonaService {
  personas:Persona[] = [];

  constructor(private dataService:DataService){

  }

  //se usa para modificar el valor del arreglo debido a la llamada asincrona
  setPersonas(personas:Persona[]){
    this.personas = personas;
  }

  agregarPersona(persona:Persona){
    console.log('persona a aagregar:'+persona.nombre);
    this.dataService.agregarPersona(persona)
    .subscribe(
      (persona:Persona) =>{
        //recuperamos objeto persona con el idPersona recien agregado
        console.log("se agrega al arreglo la persona recien insettada suscribirse"+persona.idPersona);
        this.personas.push(persona);
      }
    )
  }

  encontrarPersona(id:number){
    const persona:Persona = this.personas.find(persona =>persona.idPersona == id);
    console.log('persona encontrada:' + persona.idPersona + '' + persona.nombre);
    return persona;
  }

  modificarPersona(id:number,persona:Persona){
    console.log('persona a modificar:' + persona.idPersona);
    const personaModificadaLocal = this.personas.find(persona => persona.idPersona == id);
    personaModificadaLocal.idPersona = persona.idPersona;
    personaModificadaLocal.nombre = persona.nombre;
    this.dataService.modificarPersona(id,persona);
  }

  eliminarPersona(id:number){
    console.log('eliminar persona con id: '+ id);
    const index = this.personas.findIndex(persona => persona.idPersona == id);//encontramos el indice en el arreglo
    this.personas.splice(index,1);
    this.dataService.eliminarPersona(id);
  }

  obtenerPersonas(){
  //return this.dataService.cargarPersonas;
  return this.dataService.cargarPersonas();
    //return Observable.of(this.dataService.cargarPersonas);
  }

}
