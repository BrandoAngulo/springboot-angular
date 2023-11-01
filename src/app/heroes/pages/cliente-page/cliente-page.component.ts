import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { ClienteService as clienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-cliente-page',
  templateUrl: './cliente-page.component.html',
  styles: [
  ]
})
export class ClientePageComponent implements OnInit {

  public cliente?: Cliente;

  constructor(
    private clienteService: clienteService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.clienteService.getClienteById( id )),
      )
      .subscribe( cliente => {

        if ( !cliente ) return this.router.navigate([ '/cliente/consultar-cliente' ]);

        this.cliente = cliente;
        return;
      })
  }

  goBack():void {
    this.router.navigateByUrl('cliente/consultar-cliente')
  }

}
