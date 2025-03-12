package lab1.sistemaMatriculas.demo.DTO;

import lab1.sistemaMatriculas.demo.model.ProfileEnum;
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
    private ProfileEnum ROLE;

}
