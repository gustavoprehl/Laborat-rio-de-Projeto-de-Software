package moedaAcademica.infrastructure.persistence;

import moedaAcademica.domain.model.Aluno;
import moedaAcademica.domain.model.Moeda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, java.util.UUID> {
    Aluno findByMatricula(String matricula); // Método para encontrar aluno por matrícula
    Aluno findByEmail(String email); // Método para encontrar aluno por email
    Aluno findByCpf(String cpf); // Método para encontrar aluno por CPF
    Aluno findById(int id); // Método para encontrar aluno por ID
    Aluno findByNome(String nome); // Método para encontrar aluno por nome
    Aluno findByInstituicaoId(int instituicaoId); // Método para encontrar aluno por ID da instituição
    Aluno findByCurso(String curso); // Método para encontrar aluno por curso
    Aluno findByUsuarioId(int usuarioId); // Método para encontrar aluno por ID do usuário
}
