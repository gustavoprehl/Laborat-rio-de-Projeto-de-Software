package lab1.sistemaMatriculas.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import lab1.sistemaMatriculas.demo.model.Matricula;

public interface MatriculaRepository extends JpaRepository<Matricula, Long> {
    
    List<Matricula> findByAlunoId(Long alunoId);
    List<Matricula> findByDisciplinaId(Long disciplinaId);
}