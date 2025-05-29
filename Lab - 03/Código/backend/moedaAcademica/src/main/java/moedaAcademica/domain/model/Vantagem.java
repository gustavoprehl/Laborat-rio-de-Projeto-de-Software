package moedaAcademica.domain.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Table(name = "vantagem") 
@Entity
public class Vantagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer vantagem_id;

    private String descricao;

    @JsonProperty("pontosNecessarios")
    private int custo;


    public Integer getId() {
        return vantagem_id;
    }

    public void setId(Integer id) {
        this.vantagem_id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    @JsonProperty("pontosNecessarios")
    public int getPontosNecessarios() {
        return custo;
    }

    @JsonProperty("pontosNecessarios")
    public void setPontosNecessarios(int pontosNecessarios) {
        this.custo = pontosNecessarios;
    }
}
