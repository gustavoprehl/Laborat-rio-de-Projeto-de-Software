package moedaAcademica.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Professor {
    private UUID id;
    public String name;
    public double saldoMoedas;
    public String cpf;
    public String departamento;
    public int instituicaoId;
    public int usuarioId;
}