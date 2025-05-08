package moedaAcademica.api.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;

import moedaAcademica.application.usecases.GerenciarTransações;

@RestController
@RequestMapping("/moedas")
public class MoedaController {
    @Autowired
    private GerenciarTransações gerenciarTransacoes;

    public MoedaController(GerenciarTransações gerenciarTransacoes) {
        this.gerenciarTransacoes = gerenciarTransacoes;
    }
@PostMapping("/transferir")
public String transferirMoeda(int remetenteId, int destinatarioId, int quantidade) {
    boolean sucesso = gerenciarTransacoes.transferirMoeda(remetenteId, destinatarioId, quantidade);
    if (sucesso) {
        return "Transferência realizada com sucesso!";
    } else {
        return "Saldo insuficiente ou usuário não encontrado.";
    }
}
@PostMapping("/adicionar")
public String adicionarMoeda(int usuarioId, int quantidade) {
    boolean sucesso = gerenciarTransacoes.adicionarMoeda(usuarioId, quantidade);
    if (sucesso) {
        return "Moeda adicionada com sucesso!";
    } else {
        return "Usuário não encontrado.";
    }
}

}