import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

import { Cliente } from '../interfaces/cliente.interface';
import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class ClienteService {

  private baseUrl: string = environments.baseUrl;


  constructor(private http: HttpClient) { }


  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/cliente/consultar-clientes`);
  }

  getClienteById(id: string): Observable<Cliente | undefined> {
    return this.http.get<Cliente>(`${this.baseUrl}/cliente/consultar-cliente-por-id/${id}`)
      .pipe(
        catchError(error => of(undefined))
      );
  }

  getSuggestions(query: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/cliente/consultar-cliente-por-id?q=${query}&_limit=6`);
  }

  agregarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}/cliente`, cliente);
  }

  actualizarCliente(cliente: Cliente): Observable<Cliente> {
    if (!cliente.id) throw Error('cliente id es requerido');
    return this.http.put<Cliente>(`${this.baseUrl}/cliente/modificar-cliente/${cliente.id}`, cliente);
  }

  eliminarCliente(id: number): Observable<boolean>{
    return this.http.delete(`${this.baseUrl}/cliente/eliminar/${id}`)
    .pipe(
      catchError(err => of(false)),
      map(resp => true)
    )
  }

}
