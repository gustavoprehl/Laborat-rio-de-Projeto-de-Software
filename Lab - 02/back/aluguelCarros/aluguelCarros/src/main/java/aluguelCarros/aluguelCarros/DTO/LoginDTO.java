package aluguelCarros.aluguelCarros.DTO;

import aluguelCarros.aluguelCarros.enums.TiposClienteEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginDTO {

    private String login;
    private String senha;
    private TiposClienteEnum tipo;
}
