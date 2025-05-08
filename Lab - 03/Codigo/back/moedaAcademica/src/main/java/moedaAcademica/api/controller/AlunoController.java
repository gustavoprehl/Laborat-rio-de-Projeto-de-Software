package moedaAcademica.api.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import moedaAcademica.application.usecases.CrudAluno;
import moedaAcademica.domain.model.Aluno;

import java.util.List;


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
    public String adicionarAluno(@RequestBody Aluno aluno) {
        boolean sucesso = crudAluno.adicionarAluno(
            aluno.getName(),
            aluno.getCpf(),
            aluno.getEndereco(),
            aluno.getCurso(),
            aluno.getInstituicaoId(),
            aluno.getUsuarioId()
        );
        if (sucesso) {
            return "Aluno adicionado com sucesso!";
        } else {
            return "Erro ao adicionar aluno.";
        }
    }
    @PostMapping("/atualizar")
    public String atualizarAluno(@RequestBody Aluno aluno) {
        boolean sucesso = crudAluno.atualizarAluno(
            aluno.getId(),
            aluno.getName(),
            aluno.getCpf(),
            aluno.getEndereco(),
            aluno.getCurso(),
            aluno.getInstituicaoId(),
            aluno.getUsuarioId()
        );
        if (sucesso) {
            return "Aluno atualizado com sucesso!";
        } else {
            return "Erro ao atualizar aluno.";
        }
    }
    @PostMapping("/deletar")
    public String deletarAluno(@RequestBody Aluno aluno) {
        boolean sucesso = crudAluno.deletarAluno(aluno.getId());
        if (sucesso) {
            return "Aluno deletado com sucesso!";
        } else {
            return "Erro ao deletar aluno.";
        }
    }
    @PostMapping("/buscar")
    public String buscarAluno(@RequestBody Aluno aluno) {
        Aluno encontrado = crudAluno.buscarAluno(aluno.getId());
        if (encontrado != null) {
            return "Aluno encontrado: " + encontrado.toString();
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
