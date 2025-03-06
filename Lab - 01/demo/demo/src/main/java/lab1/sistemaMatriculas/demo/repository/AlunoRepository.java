package lab1.sistemaMatriculas.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import lab1.sistemaMatriculas.demo.model.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    Optional<Aluno> findByEmail(String email);
} 