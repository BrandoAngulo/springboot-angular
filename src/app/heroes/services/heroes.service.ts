import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class HeroesService {

  private baseUrl: string = environments.baseUrl;


  constructor(private http: HttpClient) { }


  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/cliente/consultar-clientes`);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/cliente/consultar-cliente-por-id/${id}`)
      .pipe(
        catchError(error => of(undefined))
      );
  }

  getSuggestions(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/cliente?q=${query}&_limit=6`);
  }

  agregarHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/cliente`, hero);
  }

  actualizarHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error('Hero id es requerido');
    return this.http.put<Hero>(`${this.baseUrl}/cliente/modificar-cliente/${hero.id}`, hero);
  }

  eliminarrHero(hero: Hero): Observable<boolean> {
    if (!hero.id) throw Error('Hero id es requerido');
    return this.http.delete(`${this.baseUrl}/cliente/${hero}`)
      .pipe(
        catchError(err => of(false)),
        map(resp => true)
      )
  }




}
