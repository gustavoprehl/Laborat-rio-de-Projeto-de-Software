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
    public String nome;
    public String cnpj;
    public int usuarioId;
    public String usuario;
}