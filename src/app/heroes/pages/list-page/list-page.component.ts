import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';
import { filter, pipe, tap } from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public heroes: Hero[] = [];

  constructor(
    private heroesService: HeroesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  onDelete(id: number) {
    this.heroesService.eliminarCliente(id)
    .pipe(
      filter((wasDeleted: boolean)=>wasDeleted)
    )
    .subscribe(() =>{
      this.router.navigate(['/cliente']);
    })

  }

}
