package aluguelCarros.aluguelCarros.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Data
@Entity(name = "automovel")
public class Automovel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idAutomovel", unique = true)
    private Long id;

    @Column(name = "matriculaAutomovel", unique = true)
    private String matricula;

    @Column(name = "anoAutomovel")
    private Integer ano;
    
    @Column(name = "marcaAutomovel")
    private String marca;

    @Column(name = "modeloAutomovel")
    private String modelo;

    @Column(name = "placaAutomovel", unique = true)
    private String placa;
}