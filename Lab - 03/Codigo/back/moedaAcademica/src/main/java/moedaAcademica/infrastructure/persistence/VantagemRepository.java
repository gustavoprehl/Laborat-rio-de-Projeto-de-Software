package moedaAcademica.infrastructure.persistence;

import moedaAcademica.domain.model.Vantagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VantagemRepository extends JpaRepository<Vantagem, Integer> {
}
