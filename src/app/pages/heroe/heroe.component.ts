import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private heroesServices: HeroesService) { }

  ngOnInit() {
  }

  guardar(form: NgForm) {

    let peticion = new Observable<any>();

    if (form.invalid) {
      console.log("Formulario Invalido");
    }

    Swal.fire ({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    if (this.heroe.id) {
      peticion = this.heroesServices.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesServices.crearHeroe(this.heroe);
    }

    peticion.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        type: 'success'
      });
    });



  }

}
