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
    public UUID id;
    public String name;
    public String cpf;
    public String endereco;
    public String curso;
    public int instituicaoId;
    public int usuarioId;
}