import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id: new FormControl(),
    nombres: new FormControl('', { nonNullable: true }),
    //publisher: new FormControl(Publisher.DCComics),
    apellidos: new FormControl(''),
    pais: new FormControl(''),
    celular: new FormControl(''),
    cedula: new FormControl(''),
    alt_img: new FormControl(''),
  });

  constructor(
    private heroesService: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
  ) { }

  get currentCliente(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('modificar-cliente')) return;
    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroById(id)),
        )
        .subscribe(
          hero => {
            if (!hero) {
              return this.router.navigateByUrl('/');
            }
            this.heroForm.reset(hero);
            return;
          }
        )
  }

  onSubmit(): void {
    /* console.log({formIsValid: this.heroForm.valid,
      value: this.heroForm.value}) */
     if (this.heroForm.invalid) return;
    if (this.currentCliente.id) {
      this.heroesService.actualizarHero(this.currentCliente)
        .subscribe(hero => {
          this.showSnackbar(`${hero.nombres} Actualizado!`);
        });
      return;
    }
    this.heroesService.agregarHero(this.currentCliente)
      .subscribe(hero => {
        this.showSnackbar(`${hero.nombres} Creado!`);
      })
  }

  showSnackbar(mensaje: string){
    this.snackbar.open(mensaje,'Exito',{
      duration: 2500,
    })
    this.router.navigate(['/cliente'])
  }

}
