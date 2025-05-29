package moedaAcademica.domain.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Relatorio {
    @Id
    public int relatorioId;
    public Date dataInicio;
    public Date dataFim;
    public int instituicaoId;
    public int transacaoId;
}