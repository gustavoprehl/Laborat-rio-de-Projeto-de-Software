package lab1.sistemaMatriculas.demo.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import lab1.sistemaMatriculas.demo.DTO.LoginDTO;

@Service
public class PermissaoService {

    public ResponseEntity<Object> login(LoginDTO loginDto) {

        int roleValue;

        switch (loginDto.getRole()) {
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
