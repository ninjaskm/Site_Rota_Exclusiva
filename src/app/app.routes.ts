import { Routes } from '@angular/router';
import { Home } from './paginas/home/home';
import { PlanoPagina } from './paginas/plano/plano-pagina';
import { Sobre } from './paginas/sobre/sobre';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'plano/:id', component: PlanoPagina },
  { path: 'sobre', component: Sobre },
  { path: '**', redirectTo: '' },
];
