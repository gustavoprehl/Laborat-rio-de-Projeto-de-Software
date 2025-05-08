package lab1.sistemaMatriculas.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lab1.sistemaMatriculas.demo.model.Curso;

public interface CursoRepository extends JpaRepository<Curso, Long> {
}