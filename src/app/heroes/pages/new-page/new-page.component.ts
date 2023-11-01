import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  public clienteForm = new FormGroup({
    id: new FormControl(),
    nombres: new FormControl('', { nonNullable: true }),
    apellidos: new FormControl(''),
    pais: new FormControl(''),
    celular: new FormControl(''),
    cedula: new FormControl(''),
    alt_img: new FormControl(''),
  });

  constructor(
    private clienteService: ClienteService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
  ) { }

  get currentCliente(): Cliente {
    const cliente = this.clienteForm.value as Cliente;
    return cliente;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('modificar-cliente')) return;
    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.clienteService.getClienteById(id)),
        )
        .subscribe(
          cliente => {
            if (!cliente) {
              return this.router.navigateByUrl('/');
            }
            this.clienteForm.reset(cliente);
            return;
          }
        )
  }

  onSubmit(): void {
    /* console.log({formIsValid: this.clienteForm.valid,
      value: this.clienteForm.value}) */
     if (this.clienteForm.invalid) return;
    if (this.currentCliente.id) {
      this.clienteService.actualizarCliente(this.currentCliente)
        .subscribe(cliente => {
          this.showSnackbar(`${cliente.nombres} Actualizado!`);
        });
      return;
    }
    this.clienteService.agregarCliente(this.currentCliente)
      .subscribe(cliente => {
        this.showSnackbar(`${cliente.nombres} Creado!`);
      })
  }
  onBack(){
    this.router.navigate(['/cliente'])
  }

  showSnackbar(mensaje: string){
    this.snackbar.open(mensaje,'Exito',{
      duration: 2500,
    })
    this.router.navigate(['/cliente'])
  }

}
