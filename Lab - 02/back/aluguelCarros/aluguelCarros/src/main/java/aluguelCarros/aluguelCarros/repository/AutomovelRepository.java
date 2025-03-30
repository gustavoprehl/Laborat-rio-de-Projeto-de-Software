package aluguelCarros.aluguelCarros.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import aluguelCarros.aluguelCarros.model.Automovel;

@Repository
public interface AutomovelRepository extends JpaRepository<Automovel, Long> {

}