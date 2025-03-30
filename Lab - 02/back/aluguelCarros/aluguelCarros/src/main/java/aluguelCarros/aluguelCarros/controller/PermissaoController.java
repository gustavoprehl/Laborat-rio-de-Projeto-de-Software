package aluguelCarros.aluguelCarros.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import aluguelCarros.aluguelCarros.DTO.LoginDTO;
import aluguelCarros.aluguelCarros.service.PermissaoService;

@Controller
@RequestMapping("/permissao")
public class PermissaoController {
    
    @Autowired
    private PermissaoService permissaoService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginDTO loginDto){
        return permissaoService.login(loginDto);
    }

}
