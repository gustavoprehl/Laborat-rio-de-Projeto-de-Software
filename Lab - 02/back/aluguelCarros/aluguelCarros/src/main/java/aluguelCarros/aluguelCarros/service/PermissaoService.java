package aluguelCarros.aluguelCarros.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import aluguelCarros.aluguelCarros.DTO.LoginDTO;

@Service
public class PermissaoService {
    
    public ResponseEntity<Object> login(LoginDTO loginDto) {

        int roleValue;

        switch (loginDto.getTipo()) {
            case PESSOA:
                roleValue = 1;
                break;
            case EMPRESA:
                roleValue = 2;
                break;
            case BANCO:
                roleValue = 3;
                break;
            default:
                roleValue = 0;
                break;
        }

        return ResponseEntity.ok(roleValue);
    }
}
