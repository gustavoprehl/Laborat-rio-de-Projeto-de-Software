package lab1.sistemaMatriculas.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lab1.sistemaMatriculas.demo.model.Secretaria;

@Repository
public interface SecretariaRepository extends JpaRepository<Secretaria, Long> {
    Optional<Secretaria> findByEmail(String email);
}