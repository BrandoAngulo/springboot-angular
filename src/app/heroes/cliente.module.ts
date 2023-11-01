import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ClienteRoutingModule } from './cliente-routing.module';
import { MaterialModule } from '../material/material.module';

import { ClientePageComponent } from './pages/cliente-page/cliente-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { CardComponent } from './components/card/card.component';
import { ClienteImagePipe } from './pipes/hero-image.pipe';


@NgModule({
  declarations: [
    ClientePageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    CardComponent,

    // Pipes
    ClienteImagePipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClienteRoutingModule,
    MaterialModule,
  ]
})
export class HeroesModule { }
