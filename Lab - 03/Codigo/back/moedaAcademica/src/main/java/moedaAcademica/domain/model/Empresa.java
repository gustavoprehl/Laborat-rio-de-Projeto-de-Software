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
public class Empresa {
    private UUID id;
    private String nome;
    private String cnpj;
    private String emailContato;
}