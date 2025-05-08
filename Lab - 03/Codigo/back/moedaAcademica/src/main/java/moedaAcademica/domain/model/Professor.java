package moedaAcademica.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Professor {
    @Id
    private int id;
    public String name;
    public double saldoMoedas;
    public String cpf;
    public String departamento;
    public int instituicaoId;
    public int usuarioId;
}