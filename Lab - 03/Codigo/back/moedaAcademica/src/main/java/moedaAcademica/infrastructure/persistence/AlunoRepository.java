package moedaAcademica.infrastructure.persistence;

import moedaAcademica.domain.model.Aluno;
import moedaAcademica.domain.model.Moeda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Integer> {

}
