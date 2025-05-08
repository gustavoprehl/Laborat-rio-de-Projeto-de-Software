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

public class Relatorio {
    public int relatorioId;
    public Date dataInicio;
    public Date dataFim;
    public int instituicaoId;
    public int transacaoId;
}