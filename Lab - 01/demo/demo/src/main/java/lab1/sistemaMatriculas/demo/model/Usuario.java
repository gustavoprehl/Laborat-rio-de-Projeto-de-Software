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
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name="usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario", unique = true)
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

    @JsonProperty(access = Access.WRITE_ONLY)
    @OneToMany()
    @JoinColumn(name = "id_curso", unique = true)
    private List<Curso> cursos;
}