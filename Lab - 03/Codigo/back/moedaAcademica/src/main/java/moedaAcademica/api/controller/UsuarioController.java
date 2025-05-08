package moedaAcademica.api.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import moedaAcademica.domain.model.Usuario;
import moedaAcademica.application.usecases.GerenciarTransações;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private GerenciarTransações gerenciarTransacoes;

    @PostMapping("/transferir")
    public String transferirMoeda(@RequestParam int remetenteId, @RequestParam int destinatarioId, @RequestParam int quantidade) {
        boolean sucesso = gerenciarTransacoes.transferirMoeda(remetenteId, destinatarioId, quantidade);
        if (sucesso) {
            return "Transferência realizada com sucesso!";
        } else {
            return "Saldo insuficiente ou usuário não encontrado.";
        }
    }
}
