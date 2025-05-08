package moedaAcademica.api.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import moedaAcademica.application.usecases.CrudAluno;
import moedaAcademica.domain.model.Aluno;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/alunos")
public class AlunoController {
    @Autowired
    private CrudAluno crudAluno;
    
    public AlunoController(CrudAluno crudAluno) {
        this.crudAluno = crudAluno;
    }
    @PostMapping("/adicionar")
    public String adicionarAluno(UUID id, String nome, String cpf, String endereco, String curso, int instituicaoId, int usuarioId) {
        boolean sucesso = crudAluno.adicionarAluno(id, nome, cpf, endereco, curso, instituicaoId, usuarioId);
        if (sucesso) {
            return "Aluno adicionado com sucesso!";
        } else {
            return "Erro ao adicionar aluno.";
        }
    }
    @PostMapping("/atualizar")
    public String atualizarAluno(UUID id, String nome, String cpf, String endereco, String curso, int instituicaoId, int usuarioId) {
        boolean sucesso = crudAluno.atualizarAluno(id, nome, cpf, endereco, curso, instituicaoId, usuarioId);
        if (sucesso) {
            return "Aluno atualizado com sucesso!";
        } else {
            return "Erro ao atualizar aluno.";
        }
    }
    @PostMapping("/deletar")
    public String deletarAluno(UUID id) {
        boolean sucesso = crudAluno.deletarAluno(id);
        if (sucesso) {
            return "Aluno deletado com sucesso!";
        } else {
            return "Erro ao deletar aluno.";
        }
    }
    @PostMapping("/buscar")
    public String buscarAluno(UUID id) {
        Aluno aluno = crudAluno.buscarAluno(id);
        if (aluno != null) {
            return "Aluno encontrado: " + aluno.toString();
        } else {
            return "Aluno não encontrado.";
        }
    }
    @PostMapping("/listar")
    public String listarAlunos() {
        List<Aluno> alunos = crudAluno.listarAlunos();
        if (alunos != null && !alunos.isEmpty()) {
            return "Lista de alunos: " + alunos.toString();
        } else {
            return "Nenhum aluno encontrado.";
        }
    }
}
