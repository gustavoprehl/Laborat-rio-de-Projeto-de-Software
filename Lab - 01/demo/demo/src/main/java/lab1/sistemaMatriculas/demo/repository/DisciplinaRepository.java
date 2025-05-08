package lab1.sistemaMatriculas.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import lab1.sistemaMatriculas.demo.model.Disciplina;

public interface DisciplinaRepository extends JpaRepository<Disciplina, Long> {
    List<Disciplina> findByCursoId(Long cursoId);
}