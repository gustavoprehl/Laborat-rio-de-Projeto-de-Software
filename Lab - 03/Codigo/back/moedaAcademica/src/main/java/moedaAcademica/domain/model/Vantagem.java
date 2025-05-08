package moedaAcademica.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Vantagem {
    public int vantagemId;
    public String descricao;
    public double custo;
}