package aluguelCarros.aluguelCarros.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Data
@Entity(name = "credito")
public class Credito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idCredito", unique = true)
    private Long id;

    @Column(name = "valorCredito")
    private Double valor;

    @Column(name = "status")
    private String status;
    
    @OneToOne
    @JoinColumn(name = "contrato_id")
    @Column(name = "contrato_id", unique = true)
    private Contrato contrato;
}