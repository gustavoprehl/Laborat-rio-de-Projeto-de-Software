package moedaAcademica.domain.model;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Aluno {
    private UUID id;
    private String nome;
    private String email;
    private String cpf;
    private int saldoMoedas;
}