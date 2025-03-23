package aluguelCarros.aluguelCarros.model;

import aluguelCarros.aluguelCarros.enums.TiposClienteEnum;
import jakarta.persistence.Column;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "cliente")
@Getter
@Setter
public class Clientes {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idCliente", unique = true)
    private Integer id;

    @Column(name = "nomeCliente")
    private String nome;

    @Column(name = "identCliente", unique = true)
    private String identificacao;

    @Column(name = "tipoCliente")
    private TiposClienteEnum tipo;
}
