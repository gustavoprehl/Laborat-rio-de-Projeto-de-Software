package lab1.sistemaMatriculas.demo.model;

import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ProfileEnum {
    ADMIN(1, "ROLE_ADMIN"),
    ALUNO(2, "ROLE_ALUNO"),
    SECRETARIA(3,"ROLE_SECRETARIA"),
    PROFESSOR(4, "ROLE_PROFESSOR");

    private Integer code;
    private String description;
}
