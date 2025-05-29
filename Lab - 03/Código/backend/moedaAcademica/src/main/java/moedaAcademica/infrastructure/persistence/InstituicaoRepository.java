package moedaAcademica.infrastructure.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import moedaAcademica.domain.model.Instituicao;
@Repository
public interface InstituicaoRepository extends JpaRepository<Instituicao, Integer> {
    Instituicao findByNome(String nome);
} 
