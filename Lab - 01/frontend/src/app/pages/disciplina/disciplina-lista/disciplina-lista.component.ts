import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DisciplinaListService } from '../disciplina-lista/DisciplinaListService';
import { Disciplina } from '../models/disciplina.model';

@Component({
  selector: 'app-disciplina-lista',
  standalone: true,
  imports: [TableModule],
  templateUrl: './disciplina-lista.component.html',
  styleUrls: ['./disciplina-lista.component.css']
})
export class DisciplinaListaComponent implements OnInit {
  disciplinas: Disciplina[] = [];

  constructor(private disciplinaService: DisciplinaListService) {}

  ngOnInit(): void {
    this.buscarDados();
  }

  buscarDados(): void {
    this.disciplinaService.listarTodas().subscribe({
      next: (data: Disciplina[]) => {
        this.disciplinas = data;
      },
      error: (err) => {
        console.error('Erro ao buscar dados:', err);
      }
    });
  }

  editarDisciplina(disciplina: Disciplina): void {
    // Lógica para editar a disciplina
  }

  atualizarDisciplina(disciplina: Disciplina): void {
    // Lógica para atualizar a disciplina
  }

  deletarDisciplina(disciplina: Disciplina): void {
    // Lógica para deletar a disciplina
  }
}
