import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DisciplinaListaComponent } from './pages/disciplina/disciplina-lista/disciplina-lista.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'disciplinas', component: DisciplinaListaComponent },
];
