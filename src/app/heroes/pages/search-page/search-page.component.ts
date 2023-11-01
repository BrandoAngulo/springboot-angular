import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Cliente } from '../../interfaces/cliente.interface';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public clientes: Cliente[] = [];
  public selectedCliente?: Cliente;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    ){}

  buscarCliente() {
    const value: string = this.searchInput.value || '';

    this.clienteService.getSuggestions( value )
      .subscribe( clientes => this.clientes = clientes );
  }


  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    if ( !event.option.value ) {
      this.selectedCliente = undefined;
      return;
    }

    const cliente: Cliente = event.option.value;
    this.searchInput.setValue( cliente.nombres );

    this.selectedCliente = cliente;

  }

  onBack(){
    this.router.navigate(['/cliente'])
  }


}
