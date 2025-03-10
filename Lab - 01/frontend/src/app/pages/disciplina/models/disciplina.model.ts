export class Disciplina {
    
    id: number;
    nome: string;
    curso: {
      id: number;
      nome: string;
    };
    professor: {
      id: number;
      nome: string;
    };
    alunos: Array<{
      id: number;
      nome: string;
    }>;
    maxAlunos: number;
  
    constructor(
      id: number,
      nome: string,
      curso: { id: number; nome: string },
      professor: { id: number; nome: string },
      alunos: Array<{ id: number; nome: string }>,
      maxAlunos: number
    ) {
      this.id = id;
      this.nome = nome;
      this.curso = curso;
      this.professor = professor;
      this.alunos = alunos;
      this.maxAlunos = maxAlunos;
    }
  }
  