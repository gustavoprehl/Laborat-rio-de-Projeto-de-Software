package moedaAcademica.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import moedaAcademica.application.usecases.GerenciarInstituição;
import moedaAcademica.domain.model.Instituicao;

@RestController
@RequestMapping("/instituicoes")
public class InstituiçãoController {
    @Autowired
    private GerenciarInstituição gerenciarInstituição;

    public InstituiçãoController(GerenciarInstituição gerenciarInstituição) {
        this.gerenciarInstituição = gerenciarInstituição;
    }
    @PostMapping("/adicionar")
    public String adicionarInstituição(@RequestBody Instituicao instituicao) {
        boolean sucesso = gerenciarInstituição.adicionarInstituição(
            instituicao.getNome()
            );
        if (sucesso) {
            return "Instituição adicionada com sucesso!";
        } else {
            return "Erro ao adicionar instituição.";
        }
    }
    @PostMapping("/atualizar")
    public String atualizarInstituição(@RequestBody Instituicao instituicao) {
        boolean sucesso = gerenciarInstituição.atualizarInstituição(
            instituicao.getNome()
            );
        if (sucesso) {
            return "Instituição atualizada com sucesso!";
        } else {
            return "Erro ao atualizar instituição.";
        }
    }
    @PostMapping("/deletar")
    public String deletarInstituição(@RequestBody Instituicao instituicao) {
        boolean sucesso = gerenciarInstituição.deletarInstituição(
            instituicao.getInstituicaoId()
            );
        if (sucesso) {
            return "Instituição deletada com sucesso!";
        } else {
            return "Erro ao deletar instituição.";
        }
    }
    @PostMapping("/listar")
    public List<Instituicao> listarInstituições() {
        List<Instituicao> instituicoes = gerenciarInstituição.listarInstituições();
        if (instituicoes != null) {
            return instituicoes;
        } else {
            return null;
        }
    }

}
