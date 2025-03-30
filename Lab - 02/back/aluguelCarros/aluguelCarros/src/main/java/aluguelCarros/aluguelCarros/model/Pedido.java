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
    @Column(name = "idPedido", unique = true)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    @Column(name = "cliente")
    private Clientes cliente;
    
    @ManyToOne
    @JoinColumn(name = "agente_id")
    @Column(name = "agente")
    private Agente agente;
    
    @OneToOne(mappedBy = "pedido", cascade = CascadeType.ALL)
    @Column(name = "contrato_id")
    private Contrato contrato;
    
    @ManyToOne
    @JoinColumn(name = "automovel_id")
    @Column(name = "automovel")
    private Automovel automovel;

    public Object getStatus() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getStatus'");
    }

    public void setStatus(Object status) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setStatus'");
    }

}