import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [CommonModule, DividerModule, ButtonModule]
})
export class LoginComponent {

  constructor(private router: Router) {}

entrar() {
  console.log('Entrou');
  this.router.navigate(['/disciplinas']);
}

  
}
