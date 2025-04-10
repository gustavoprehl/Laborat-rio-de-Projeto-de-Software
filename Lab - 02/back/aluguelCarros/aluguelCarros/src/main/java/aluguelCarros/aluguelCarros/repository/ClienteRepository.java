package aluguelCarros.aluguelCarros.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import aluguelCarros.aluguelCarros.model.Clientes;

@Repository
public interface ClienteRepository extends JpaRepository<Clientes, Long> {
    
}
