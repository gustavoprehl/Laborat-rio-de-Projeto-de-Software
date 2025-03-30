package aluguelCarros.aluguelCarros.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Data
@Entity(name = "agente")
public class Agente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idAgente", unique = true)
    private Long id;

    @Column(name = "nomeAgente", unique = true)
    private String nome;

    @Column(name = "tipoAgente")
    private String tipo;
}