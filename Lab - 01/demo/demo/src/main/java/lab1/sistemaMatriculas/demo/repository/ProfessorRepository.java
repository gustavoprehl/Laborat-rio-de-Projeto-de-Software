package lab1.sistemaMatriculas.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import lab1.sistemaMatriculas.demo.model.Professor;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    Optional<Professor> findByEmail(String email);
}