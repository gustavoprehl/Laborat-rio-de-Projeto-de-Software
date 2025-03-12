package lab1.sistemaMatriculas.demo.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "alunos")
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_alunos", unique = true)
    private Long id;

    @JsonProperty(access = Access.WRITE_ONLY)
    @Column(name = "nome", unique = true, nullable = false)
    private String nome;

    @JsonProperty(access = Access.WRITE_ONLY)
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @JsonProperty(access = Access.WRITE_ONLY)
    @Column(name = "senha", unique = true, nullable = false)
    private String senha;

    @Column(name = "ROLE_ALUNO", unique = true, nullable = true)
    private ProfileEnum ROLE_ALUNO;

    @JsonProperty(access = Access.WRITE_ONLY)
    @ManyToMany
    @JoinTable(
        name = "aluno_disciplinas",
        joinColumns = @JoinColumn(name = "aluno_id"),
        inverseJoinColumns = @JoinColumn(name = "disciplina_id")
    )
    private List<Disciplina> disciplinas;

}