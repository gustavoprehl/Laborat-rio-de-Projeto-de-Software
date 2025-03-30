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
    private Long id;

    @Column(name = "valorCredito")
    private Double valor;

    @Column(name = "status")
    private String status;
    
    
    @OneToOne
    @JoinColumn(name = "contrato_id")
    private Contrato contrato;
}