package moedaAcademica.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {
    public int id;
    public String email;
    public String senha;
    public String tipoUsuario;
}