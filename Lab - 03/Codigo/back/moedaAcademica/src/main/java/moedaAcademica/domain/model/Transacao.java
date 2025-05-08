package moedaAcademica.domain.model;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Transacao {
    public int transacaoId;
    public Date data;
    public int moedaId;
    public String tipo;
    public int quantidade;
}