package aluguelCarros.aluguelCarros.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Data
@Entity(name = "pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Clientes cliente;
    
    @Column(name = "data_inicio")
    private String dataInicio;

    @Column(name = "data_fim")
    private String dataFim;

    @OneToOne(mappedBy = "pedido", cascade = CascadeType.ALL)
    private Contrato contrato;
    
    @ManyToOne
    @JoinColumn(name = "automovel_id")
    private Automovel automovel;

    @Column(name = "status")
    private String status;

}