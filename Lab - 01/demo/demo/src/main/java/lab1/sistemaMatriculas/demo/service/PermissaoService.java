package lab1.sistemaMatriculas.demo.service;

import org.springframework.http.ResponseEntity;

import jakarta.persistence.criteria.CriteriaBuilder.Case;
import lab1.sistemaMatriculas.demo.DTO.LoginDTO;

public class PermissaoService {

    public static ResponseEntity<Object> login(LoginDTO loginDto) {

        loginDto.getSenha();
        loginDto.getROLE();
        loginDto.getLogin();

        int roleValue;

        switch (loginDto.getROLE()) {
            case ADMIN:
                roleValue = 1;
                break;
            case ALUNO:
                roleValue = 2;
                break;
            case SECRETARIA:
                roleValue = 3;
                break;
            case PROFESSOR:
                roleValue = 4;
                break;
            default:
                roleValue = 0;
                break;
        }

        return ResponseEntity.ok(roleValue);
    }

}
