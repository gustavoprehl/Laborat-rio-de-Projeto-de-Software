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

public class CodigoResgate {
    public int codigoResgateId;
    public Date dataGeracao;
    public int moedaId;
}