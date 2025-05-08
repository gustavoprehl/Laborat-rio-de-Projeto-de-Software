package moedaAcademica.application.usecases;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import moedaAcademica.domain.model.Aluno;
import moedaAcademica.infrastructure.persistence.AlunoRepository;

@Service
public class CrudAluno {
    @Autowired
    private AlunoRepository alunoRepository;

    public CrudAluno(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }
    public boolean adicionarAluno(UUID id, String nome, String cpf, String endereco, String curso, int instituicaoId, int usuarioId) {
        Aluno aluno = new Aluno(id, nome, cpf, endereco, curso, instituicaoId, usuarioId);
        alunoRepository.save(aluno);
        return true;
    }
    public boolean atualizarAluno(UUID id, String nome, String cpf, String endereco, String curso, int instituicaoId, int usuarioId) {
        Aluno aluno = alunoRepository.findById(id).orElse(null);
        if (aluno == null) return false;
        aluno.setName(nome);
        aluno.setCpf(cpf);
        aluno.setEndereco(endereco);
        aluno.setCurso(curso);
        aluno.setInstituicaoId(instituicaoId);
        aluno.setUsuarioId(usuarioId);
        alunoRepository.save(aluno);
        return true;
    }
    public boolean deletarAluno(UUID id) {
        Aluno aluno = alunoRepository.findById(id).orElse(null);
        if (aluno == null) return false;
        alunoRepository.delete(aluno);
        return true;
    }
    public Aluno buscarAluno(UUID id) {
        return alunoRepository.findById(id).orElse(null);
    }
    public List<Aluno> listarAlunos() {
        return alunoRepository.findAll();
    }
    public List<Aluno> listarAlunosPorInstituicao(int instituicaoId) {
        Aluno aluno = alunoRepository.findByInstituicaoId(instituicaoId);
        return aluno != null ? java.util.Collections.singletonList(aluno) : java.util.Collections.emptyList();
    }
    public List<Aluno> listarAlunosPorCurso(String curso) {
        Aluno aluno = alunoRepository.findByCurso(curso);
        return aluno != null ? java.util.Collections.singletonList(aluno) : java.util.Collections.emptyList();
    }
}
