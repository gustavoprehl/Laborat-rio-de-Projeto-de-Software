package aluguelCarros.aluguelCarros.repository;

import aluguelCarros.aluguelCarros.model.Contrato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContratoRepository extends JpaRepository<Contrato, Long> {
}