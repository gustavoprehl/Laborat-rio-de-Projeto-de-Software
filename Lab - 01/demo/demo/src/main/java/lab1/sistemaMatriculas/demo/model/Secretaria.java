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
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name="secretaria")
public class Secretaria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_secretaria", unique = true)
    private Long id;

    @Column(name = "nome", unique = true, nullable = false)
    private String nome;

    @JsonProperty(access = Access.WRITE_ONLY)
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "senha", unique = true, nullable = false)
    private String senha;

    @Column(name = "ROLE_SECRETARIA", unique = true, nullable = true)
    private ProfileEnum ROLE_SECRETARIA;

    @OneToMany()
    @JoinColumn(name = "id_curso", unique = true)
    @JsonProperty(access = Access.WRITE_ONLY)
    private List<Curso> cursos;
}