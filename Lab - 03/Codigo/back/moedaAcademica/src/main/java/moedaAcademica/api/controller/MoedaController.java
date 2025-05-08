package moedaAcademica.api.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import moedaAcademica.application.usecases.GerenciarTransações;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("/moeda")
public class MoedaController {

    @Autowired
    private GerenciarTransações gerenciarTransações;

    @RequestMapping(value = "/requestMethodName", method = RequestMethod.GET)
    public String requestMethodName(@RequestParam String param) {
        return new String();
    }
    
}