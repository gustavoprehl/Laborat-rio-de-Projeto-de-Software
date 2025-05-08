package lab1.sistemaMatriculas.demo.service;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class NotificacaoService {

    private final List<String> notificacoes = new ArrayList<>();

    public void enviarNotificacao(String mensagem) {
        notificacoes.add(mensagem);
        System.out.println("🔔 Notificação enviada: " + mensagem);
    }

    public List<String> listarNotificacoes() {
        return new ArrayList<>(notificacoes);
    }
}