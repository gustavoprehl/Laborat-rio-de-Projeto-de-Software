package aluguelCarros.aluguelCarros.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import aluguelCarros.aluguelCarros.model.Agente;

@Repository
public interface AgenteRepository extends JpaRepository<Agente, Long> {
    
}