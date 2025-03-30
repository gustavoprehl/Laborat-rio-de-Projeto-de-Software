package aluguelCarros.aluguelCarros.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import aluguelCarros.aluguelCarros.service.ClienteService;
import aluguelCarros.aluguelCarros.model.Clientes;

@RestController
@RequestMapping("/clientes")
public class ClientesController {
    
    @Autowired
    private ClienteService clientesService;
    
    @GetMapping("/listarClientes")
    public List<Clientes> listarClientes() {
        return clientesService.listarClientes();
    }
    
    @GetMapping("buscarCliente/{id}")
    public Clientes buscarClientes(@PathVariable Long id) {
        return clientesService.buscarClientes(id);
    }
    
    @PostMapping("/salvarCliente")
    public Clientes salvarClientes(@RequestBody Clientes clientes) {
        return clientesService.salvarClientes(clientes);
    }
    
    @PutMapping("atualizarClientes/{id}")
    public Clientes atualizarClientes(@PathVariable Long id, @RequestBody Clientes clientes) {
        return clientesService.atualizarClientes(id, clientes);
    }

    @DeleteMapping("deletarCliente/{id}")
    public void deletarClientes(@PathVariable Long id) {
        clientesService.deletarClientes(id);
    }
}
