import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/cliente.interface';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {
    this.clienteService.getClientes()
      .subscribe(clientes => this.clientes = clientes);
  }

  onDelete(id: number) {
    this.clienteService.eliminarCliente(id)
    .subscribe()
    //filtra por cliente cuando sea eliminado
    this.clientes = this.clientes.filter(cliente => cliente.id !== id)
  }

}
