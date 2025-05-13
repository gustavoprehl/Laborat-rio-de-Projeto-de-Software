package moedaAcademica.domain.model;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "transacao")
public class Transacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int transacaoId;
    public Date data;
    public int moedaId;
    public String tipo;
    public int quantidade;
    public int remetenteId;
    public int destinatarioId;
    public int usuarioId;

    public Transacao(Date data, int moedaId, String tipo, int quantidade) {
        this.data = data;
        this.moedaId = moedaId;
        this.tipo = tipo;
        this.quantidade = quantidade;
    }
}