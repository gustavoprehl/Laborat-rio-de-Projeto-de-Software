package aluguelCarros.aluguelCarros.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Data
@Entity(name = "contrato")
public class Contrato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idContrato", unique = true)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "pedido_id")
    @Column(name = "pedido_id", unique = true)
    private Pedido pedido;
    
    @OneToOne(mappedBy = "contrato", cascade = CascadeType.ALL)
    @Column(name = "credito_id", unique = true)
    private Credito credito;
}