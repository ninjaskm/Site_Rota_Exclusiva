import { Routes } from '@angular/router';

// Cada página é carregada só quando o visitante a abre (lazy loading)
export const routes: Routes = [
  { path: '', loadComponent: () => import('./paginas/home/home').then((m) => m.Home) },
  {
    path: 'plano/:id',
    loadComponent: () => import('./paginas/plano/plano-pagina').then((m) => m.PlanoPagina),
  },
  { path: 'sobre', loadComponent: () => import('./paginas/sobre/sobre').then((m) => m.Sobre) },
  { path: '**', redirectTo: '' },
];
