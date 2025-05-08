package moedaAcademica.application.usecases;

import org.springframework.stereotype.Service;

import moedaAcademica.domain.model.Transacao;
import moedaAcademica.domain.model.Usuario;
import moedaAcademica.infrastructure.persistence.TransacaoRepository;
import moedaAcademica.infrastructure.persistence.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;


@Service
public class GerenciarTransações {
    
    private TransacaoRepository transacaoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;


    @Transactional
    public boolean transferirMoeda(int remetenteId, int destinatarioId, int quantidade) {
        Usuario remetente = usuarioRepository.findById(remetenteId).orElse(null);
        Usuario destinatario = usuarioRepository.findById(destinatarioId).orElse(null);
        if (remetente == null || destinatario == null) return false;
        if (remetente.saldo < quantidade) return false;
        remetente.saldo -= quantidade;
        destinatario.saldo += quantidade;
        usuarioRepository.save(remetente);
        usuarioRepository.save(destinatario);
        Date data = new Date();
        Transacao transacao = new Transacao( data,1, "Transferência de Moeda", quantidade);
        transacaoRepository.save(transacao);
        return true;
    }


    @Transactional
    public boolean adicionarMoeda(int usuarioId, int quantidade) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);
        if (usuario == null) return false;
        usuario.saldo += quantidade;
        usuarioRepository.save(usuario);
        Date data = new Date();
        Transacao transacao = new Transacao( data,1, "Adição de Moeda", quantidade);
        transacaoRepository.save(transacao);
        return true;
    }
    
}
